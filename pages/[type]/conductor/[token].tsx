import { useRouter } from "next/router";
import ConductorReader from "../../../libs/ConductorReader/ConductorReader";
import Layout from "../../../libs/Layout/Layout";

interface props {
    token: string
}
export default function conductor({token}:props) {
  return (
    <Layout title={"Conductor"}>
      <ConductorReader token={token}/>
    </Layout>
  );
}


export async function getServerSideProps({ query, req }) {
    return {
      props: { token: query.token },
    };
  }
  