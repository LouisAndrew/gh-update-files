type Args = {
  name: string;
  age: number;
};

type ReturnType = {
  fullName: string;
};

export default (args: Args): ReturnType => {
  return {
    fullName: `${args.name} ${args.age}`,
  };
};
