const { Report } = require('../models/reportModel');
const { User } = require('../models/userModel');

const reportResolvers = {
  Query: {
    reports: async (_, args, context) => {
      if (!context.user) {
        throw new Error('Authorization Error');
      }
      const { email } = context.user;
      const foundUser = await User.findOne({ email }).populate('reports');
      if (!foundUser) {
        throw new Error('Authorization Error');
      }
      return foundUser.reports;
    }
  },
  Mutation: {
    createReport: async (_, args, context) => {
      if (!context.user) {
        throw new Error('Authorization Failed');
      }
      const foundUser = await User.findOne({ email: context.user.email });
      if (!foundUser) throw new Error('Authorization Error');

      const { name } = args;
      const report = new Report({
        name,
        projects: args.input,
        createdBy: context.user.email
      });
      await report.save();
      foundUser.reports.push(report.id);
      foundUser.save();

      return report;
    },
    deleteReport: async (_, args, context) => {
      if (!context.user) throw new Error('Authorization Failed');
      const { email } = context.user;
      const foundUser = await User.findOne({
        email
      });
      if (!foundUser) {
        throw new Error('Authorization Error');
      }
      let foundItem = foundUser.reports.indexOf(args.id);
      if (foundItem !== -1) {
        foundUser.reports.splice(foundItem, 1);
      } else {
        throw new Error('Cannot Delete this Report');
      }
      foundUser.save();
      const deletedReport = await Report.findByIdAndDelete(args.id);
      return deletedReport;
    }
  }
};

module.exports = {
  reportResolvers
};
