const { SchemaDirectiveVisitor } = require("graphql-tools")
const {verify} = require('../utils/jwt')
const invalidAuthorErr = require('../errors/invalidAuthor')
const users = require('../model/users')

class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(type) {
        this.ensureFieldsWrapped(type);
        type._requiredAuthRole = this.args.requires;
    }

    // Visitor methods for nested types like fields and arguments
    // also receive a details object that provides information about
    // the parent and grandparent types.
    visitFieldDefinition(field, details) {
        this.ensureFieldsWrapped(details.objectType);
        field._requiredAuthRole = this.args.requires;
    }

    async ensureFieldsWrapped(objectType) {
        // Mark the GraphQLObjectType object to avoid re-wrapping:
        if (objectType._authFieldsWrapped) return;
        objectType._authFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const { resolve = defaultFieldResolver } = field;
            field.resolve = async (...args) => {
                const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole;
                if (! requiredRole) return resolve.apply(this, args);
                const authorization = args[2].headers?.authorization
                if (!authorization ) throw new invalidAuthorErr('你还没有登录，请登录')
                const token = authorization.substr(5).trim()
                const { id } =  await verify(token)
                const user = await users.findOne({where: {id, role: requiredRole }})
                if (user === null) throw new invalidAuthorErr('登录会话失效，没有这个用户')
                args[2].auth = user
                return resolve.apply(this, args);
            };
        });
    }
}

module.exports = AuthDirective
