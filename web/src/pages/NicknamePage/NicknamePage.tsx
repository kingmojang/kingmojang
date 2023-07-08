import { useSocialSignup } from "@kingmojang/api";
import type { ProviderType } from "@kingmojang/types";
import { TextField } from "@kingmojang/ui";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Gradation from "../../components/Gradation/Gradation";
import LogoHeader from "../../components/LogoHeader/LogoHeader";
import useUserStore from "../../stores/userStore";
import * as Style from "./NicknamePage.css";

export function NicknamePage() {
  const location = useLocation();
  const [nickname, setNickname] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const provider = searchParams.get("provider");
  const error = searchParams.get("error");
  const navigator = useNavigate();
  const { userInfo } = useUserStore();

  useEffect(() => {
    if (error) {
      alert(error);
      navigator("/");
    }
  }, []);
  const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setNickname(ev.currentTarget.value);
  };
  console.log("userType", userInfo.memberType);

  const { mutate, isSuccess } = useSocialSignup({
    email: email || "", //여기도
    memberType: userInfo.memberType,
    nickname: nickname,
    provider: provider?.toUpperCase() as ProviderType, // 여기도 추후에 고쳐
    // code: 여기로 code 가져와야됌
  });

  const submit = () => {
    mutate();
    if (isSuccess) {
      navigator("/", { replace: true });
    }
  };

  return (
    <div className={Style.container}>
      <LogoHeader />
      <Gradation />
      <div className={Style.wrapper}>
        <h1 className={Style.title}>사용할 닉네임을 입력해주세요!</h1>
        <h6 className={Style.info}>한글 2~10자까지 가능해요.</h6>
        <TextField
          onChange={handleInput}
          placeholder="닉네임"
          className={Style.input}
        />
        <button className={Style.finishButton} onClick={submit}>
          회원가입 완료
        </button>
      </div>
    </div>
  );
}