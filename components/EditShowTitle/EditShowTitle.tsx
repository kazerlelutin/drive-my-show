import classes from "./EditShowTitle.module.css";
import { useState, useEffect, FormEvent } from "react";
import SubmitButton from "../../UI/SubmitButton/SubmitButton";
import useLazyFetch from "../../hooks/useLazyFetch";
import { toast } from "react-toastify";
import useTranslate from "../../hooks/useTranslate";
import pageTranslate from "../../translate/page.translate";

interface props {
  readonly title: string;
  readonly token: string;
}
export default function EditShowTitle({ title, token }: props) {
  const t = useTranslate(pageTranslate),
    { loading, data, api } = useLazyFetch("/updateShowTitle"),
    [isEdit, setIsEdit] = useState<boolean>(false),
    [value, setValue] = useState<string>(title);

  useEffect(() => {
    if (data) {
      setIsEdit(false);
      toast.success("Title updated !");
    }
  }, [data]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    api({ title: value, token });
  }

  return (
    <div className={classes.container}>
      {isEdit ? (
        <form className={classes.container} onSubmit={handleSubmit}>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <SubmitButton isLoading={loading} txt={t("Submit")} />
        </form>
      ) : (
        <div className={classes.title}>{data?.title || title}</div>
      )}
      <button onClick={() => setIsEdit(!isEdit)}>
        {t(isEdit ? "Cancel" : "Edit")}
      </button>
    </div>
  );
}
