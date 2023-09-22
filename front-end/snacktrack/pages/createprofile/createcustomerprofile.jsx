import NavBar from "../navbar";
import {useState} from "react";
import Link from "next/link";

export default function CreateCustomer() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    function handleUserNameChange(e) {
        setUserName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handleAvatarUrlChange(e) {
        setAvatarUrl(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handlePasswordConfirmChange(e) {
        setPasswordConfirm(e.target.value);
    }

    let path = "";
    if (password.length !== 0 && password === passwordConfirm) {
        path = "/map";
    } else {
        path = "";
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(path);
        if (password !== passwordConfirm) {
            setPasswordErrorMsg(
                "The passwords you entered do not match, please check and try again."
            );
        }
        const customerProfile = {
            username: userName,
            email,
            avatar_url: avatarUrl,
            password,
        };
    }

    return (
        <>
            <NavBar/>
            <h1 className={"title has-text-centered"}>Create Customer</h1>
            <br></br>
            <div className={"columns is-centered"}>
                <div className={"column is-one-third"}>
                    <form className={"box"} onSubmit={handleSubmit}>

                        <div className={"field"}>
                                <label className={"label"} htmlFor="username_input">
                                    Username
                                </label>
                            <div className={"control"}>
                                <input
                                    className={"input"}
                                    required={true}
                                    type="text"
                                    name="username_input"
                                    placeholder="johnsmith1"
                                    value={userName}
                                    onChange={handleUserNameChange}
                                ></input>
                            </div>
                        </div>


                        <div className={"field"}>
                                <label className={"label"} htmlFor="email_input">
                                    Email
                                </label>
                            <div className={"control"}>
                                <input
                                    className={"input"}
                                    required={true}
                                    type="text"
                                    name="email_input"
                                    placeholder="example@domain.co.uk"
                                    value={email}
                                    onChange={handleEmailChange}
                                ></input>
                            </div>
                        </div>


                        <div className={"field"}>
                                <label className={"label"} htmlFor="avatar_input">
                                    Avatar URL
                                </label>
                            <div className={"control"}>
                                <input
                                    className={"input"}
                                    required={true}
                                    type="text"
                                    name="avatar_input"
                                    placeholder="https://www.photos.google.com/myimage.png"
                                    value={avatarUrl}
                                    onChange={handleAvatarUrlChange}
                                ></input>
                            </div>
                        </div>


                        <div className={"field"}>
                                <label className={"label"} htmlFor="password_input">
                                    Password
                                </label>
                            <div className={"control"}>
                                <input
                                    className={"input"}
                                    required={true}
                                    type="text"
                                    name="password_input"
                                    placeholder="*******"
                                    value={password}
                                    onChange={handlePasswordChange}
                                ></input>
                            </div>
                        </div>

                        <div className={"field"}>
                                <label className={"label"} htmlFor="password_confirm_input">
                                    Confirm Password
                                </label>
                            <div className={"control"}>
                                <input
                                    className={"input"}
                                    required={true}
                                    type="text"
                                    name="password_confirm_input"
                                    placeholder="*******"
                                    value={passwordConfirm}
                                    onChange={handlePasswordConfirmChange}
                                ></input>
                            </div>
                        </div>

                        <button className={"button"} type={"submit"}>
                            <Link
                                href={{
                                    //the variable path below is only correct if the password.length !==0 and the password === passwordConfirm
                                    pathname: `${path}`,
                                }}
                            >
                                Submit
                            </Link>
                        </button>

                        <p>{passwordErrorMsg}</p>

                    </form>
                </div>
            </div>
        </>
    );
}
