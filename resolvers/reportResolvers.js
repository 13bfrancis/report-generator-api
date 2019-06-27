const { Project } = require('../models/projectModel');
const { Report } = require('../models/reportModel');

const reportResolvers = {
  Mutation: {
    createReport: (_, args) => {
      const { name } = args;

      const projects = args.input.map(project => {
        let savedProject = new Project({
          ...project
        });
        savedProject.save();
        return savedProject;
      });

      return {
        name,
        projects
      };
    }
  }
};

module.exports = {
  reportResolvers
};
