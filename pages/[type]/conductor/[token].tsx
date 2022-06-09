import Layout from "../../../Layouts/Layout/Layout";
import ConductorReader from "../../../Page-Related/ConductorReader/ConductorReader";

interface props {
  readonly token: string;
  readonly type: string;
}
export default function conductor(props: props) {
  return (
    <Layout title={"Conductor"}>
      <ConductorReader {...props}/>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { token: query.token, type: query.type },
  };
}