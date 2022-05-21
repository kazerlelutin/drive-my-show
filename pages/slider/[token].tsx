import ConductorReader from "../../libs/ConductorReader/ConductorReader";
import Layout from "../../libs/Layout/Layout";
import Slider from "../../libs/Slider/Slider";

interface props {
    readonly token: string
}
export default function slider(props:props) {
  return <Slider {...props} />;
}


export async function getServerSideProps({ query, req }) {
    return {
      props: { token: query.token},
    };
  }
  