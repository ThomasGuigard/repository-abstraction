
export class MissingEnvVariableError extends Error {

  constructor(missingEnvVariable: string) {
    super(`An environment variable is missing : ${missingEnvVariable}`);
  }
}