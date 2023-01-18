import { GetStaticProps } from 'next';

export interface EditProps {
  name: string;
}

export const getStaticProps: GetStaticProps<EditProps> = async (context) => {
  return {
    props: {
      name: 'Edit'
    },
  };
};

export function Edit(props: EditProps) {
  return (
    <div>
      <h1 className="bg-red-500 p-2 font-mono">
        Welcome to {props.name}!
      </h1>
    </div>
  );
}

export default Edit
