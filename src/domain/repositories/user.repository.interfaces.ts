export interface UserRepositoryCreateParams {
    data: {
        name: string;
        email: string;
        age: number;
    };
}

export interface UserRepositoryListParams {
    limit?: number;
    skip?: number;
}

export interface UserRepositoryFindParams {
    filters:
        | {
              id: string;
          }
        | {
              email: string;
          };
}
