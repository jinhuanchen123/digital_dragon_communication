import Home_Styles from "./HomePage.module.css";

export default function MembersBar() {
    return (
        <div id={Home_Styles.membersBar}>
            <div className={Home_Styles.member}>
                <img className={Home_Styles.avatarImage} src="https://github.com/shadcn.png"></img>
                <h1 className={Home_Styles.memberName}>Stefin</h1>
            </div>
            <div className={Home_Styles.member}>
                <img className={Home_Styles.avatarImage} src="https://github.com/shadcn.png"></img>
                <h1 className={Home_Styles.memberName}>Gabriel</h1>
            </div>
            <div className={Home_Styles.member}>
                <img className={Home_Styles.avatarImage} src="https://github.com/shadcn.png"></img>
                <h1 className={Home_Styles.memberName}>Daniel Juan Galvez</h1>
            </div>
            
        </div>
    )
}