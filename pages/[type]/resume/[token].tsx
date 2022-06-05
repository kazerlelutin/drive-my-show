import Layout from "../../../libs/Layout/Layout";
import Resume from "../../../libs/Resume/Resume";

interface props {
  readonly token: string;
  readonly type: string;
}
export default function resume({ token, type }: props) {
  return (
    <Layout title={"Resume"}>
      <Resume token={token} type={type} />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { token: query.token, type: query.type },
  };
}