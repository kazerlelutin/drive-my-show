import Layout from "../../../Layouts/Layout/Layout";
import ConductorReader from "../../../Page-Related/ConductorReader/ConductorReader";


interface props {
  readonly token: string;
  readonly type: string;
}
export default function conductor({ token, type }: props) {
  return (
    <Layout title={"Conductor"}>
      <ConductorReader token={token} type={type} />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { token: query.token, type: query.type },
  };
}