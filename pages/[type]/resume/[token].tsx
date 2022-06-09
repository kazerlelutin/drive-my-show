import Layout from "../../../components/_Layouts/Layout/Layout";
import Resume from "../../../components/_Page-Related/Resume/Resume";

interface props {
  readonly token: string;
  readonly type: string;
}
export default function resume(props: props) {
  return <Layout title={"Resume"}><Resume {...props} /></Layout>;
}

export async function getServerSideProps({ query }) {
  return {
    props: { token: query.token, type: query.type },
  };
}