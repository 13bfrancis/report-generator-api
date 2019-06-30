const { Project } = require('../models/projectModel');
const { Report } = require('../models/reportModel');

//last item I need is the query: reports resolver

const reportResolvers = {
  Mutation: {
    createReport: async (_, args, context) => {
      if (!context.user) {
        throw new Error('Authorization Failed');
      }
      const { name } = args;

      const projects = args.input.map(project => {
        let savedProject = new Project({
          ...project
        });
        savedProject.save();
        return savedProject;
      });
      const projectIds = projects.map(project => project.id.toString());
      const report = new Report({
        name,
        projects: projectIds
      });
      await report.save();
      const completeReport = await Report.findById(report._id).populate(
        'projects'
      );
      return completeReport;
    }
  }
};

module.exports = {
  reportResolvers
};
