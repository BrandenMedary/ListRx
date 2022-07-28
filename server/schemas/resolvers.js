const { AuthenticationError } = require('apollo-server-express');
const { User, Prescriptions } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('prescriptions');
            return userData;
         }
        throw new AuthenticationError('Not logged in');
      },

      users: async () => {
          return User.find()
          .select('-__v -password')
          .populate('prescriptions');
      }
    }
}