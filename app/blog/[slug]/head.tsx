import getPostContent from "../../../utils/GetPostContent";
import { urlParamType } from "./UrlType";

export default function Head(props: urlParamType) {
  return (
    <>
      <title>{getPostContent(props.params.slug).data.title}</title>
    </>
  );
}
