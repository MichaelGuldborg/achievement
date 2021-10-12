import Authorization from "./Authorization";
import Project from "./Project";
import ProjectUser from "./ProjectUser";

export interface ProjectAuthResponse {
    authorization: Authorization;
    project: Required<Project>;
    user: Required<ProjectUser>;
}

export default ProjectAuthResponse;