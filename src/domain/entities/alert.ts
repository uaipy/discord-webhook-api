export type Alert = {
  orquestratorName: string;
  orquestratorId: string;
  data: {
    message: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};
