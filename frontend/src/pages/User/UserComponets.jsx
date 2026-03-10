import { useEffect, useState } from "react";
import MoviesWraped from "/src/components/MoviesWraped/MoviesWraped.jsx"

function PersonalInfo({user_info}){
    const [editingBio, setEditingBio] = useState(false);
    const [bio, setBio] = useState(user_info?.bio || "");
    const [bioInput, setBioInput] = useState(bio);

    const avatarLetter = user_info?.firstname?.[0]?.toUpperCase() || "?";
    const fullName = `${user_info?.firstname || ""} ${user_info?.lastname || ""}`.trim();
    const genres = user_info?.favorite_genre || [];

    function saveBio(){
        setBio(bioInput);
        setEditingBio(false);
    }

    return(
        <div className="personal_info_container">

            {/* Avatar / Profile Picture */}
            <div className="profile_pic_section">
                {user_info?.profile_pictur_url ? (
                    <img
                        src={user_info.profile_pictur_url}
                        alt="Profile"
                        className="profile_pic"
                    />
                ) : (
                    <div className="profile_pic_placeholder">{avatarLetter}</div>
                )}
                <button className="change_pic_btn">Change Photo</button>
            </div>

            {/* Name & Email */}
            <div className="info_section">
                <h2 className="user_fullname">{fullName}</h2>
                <p className="user_email">{user_info?.email}</p>
            </div>

            {/* Bio */}
            <div className="info_section">
                <h3 className="section_label">Bio</h3>
                {editingBio ? (
                    <div className="bio_edit">
                        <textarea
                            value={bioInput}
                            onChange={e => setBioInput(e.target.value)}
                            rows={3}
                            placeholder="Tell us about yourself..."
                            className="bio_textarea"
                        />
                        <div className="bio_actions">
                            <button className="save_btn" onClick={saveBio}>Save</button>
                            <button className="cancel_btn" onClick={() => setEditingBio(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="bio_display" onClick={() => setEditingBio(true)}>
                        <p className="bio_text">{bio || <span className="bio_placeholder">Add a bio...</span>}</p>
                        <span className="edit_icon">✏️</span>
                    </div>
                )}
            </div>

            {/* Favorite Genres */}
            <div className="info_section">
                <h3 className="section_label">Favorite Genres</h3>
                {genres.length > 0 ? (
                    <div className="genre_tags">
                        {genres.map((g, i) => (
                            <span key={i} className="genre_tag">{g}</span>
                        ))}
                    </div>
                ) : (
                    <p className="bio_placeholder">No favorite genres set yet.</p>
                )}
            </div>

        </div>
    )
}

function Security(){
    const [changingPassword, setChangingPassword] = useState(false);
    const [changingEmail, setChangingEmail] = useState(false);
    const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
    const [emailForm, setEmailForm] = useState({ newEmail: "", password: "" });
    const [pwError, setPwError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pwSuccess, setPwSuccess] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");

    function handlePwChange(e){
        setPwForm(f => ({ ...f, [e.target.name]: e.target.value }));
        setPwError("");
    }

    function handleEmailChange(e){
        setEmailForm(f => ({ ...f, [e.target.name]: e.target.value }));
        setEmailError("");
    }

    function submitPassword(){
        if (!pwForm.current || !pwForm.next || !pwForm.confirm) {
            setPwError("All fields are required."); return;
        }
        if (pwForm.next !== pwForm.confirm) {
            setPwError("New passwords do not match."); return;
        }
        if (pwForm.next.length < 6) {
            setPwError("Password must be at least 6 characters."); return;
        }
        // TODO: wire up to API
        setPwSuccess("Password updated successfully.");
        setPwForm({ current: "", next: "", confirm: "" });
        setChangingPassword(false);
    }

    function submitEmail(){
        if (!emailForm.newEmail || !emailForm.password) {
            setEmailError("All fields are required."); return;
        }
        // TODO: wire up to API
        setEmailSuccess("Email updated successfully.");
        setEmailForm({ newEmail: "", password: "" });
        setChangingEmail(false);
    }

    return(
        <div className="security_container">
            <h2 className="security_title">Security</h2>

            {/* Change Password */}
            <div className="security_card">
                <div className="security_card_header">
                    <div>
                        <h3 className="security_card_title">Password</h3>
                        <p className="security_card_sub">Update your account password</p>
                    </div>
                    {!changingPassword && (
                        <button className="change_pic_btn" onClick={() => { setChangingPassword(true); setPwSuccess(""); }}>
                            Change
                        </button>
                    )}
                </div>

                {pwSuccess && <p className="success_msg">{pwSuccess}</p>}

                {changingPassword && (
                    <div className="security_form">
                        <input
                            type="password"
                            name="current"
                            placeholder="Current password"
                            value={pwForm.current}
                            onChange={handlePwChange}
                            className="security_input"
                        />
                        <input
                            type="password"
                            name="next"
                            placeholder="New password"
                            value={pwForm.next}
                            onChange={handlePwChange}
                            className="security_input"
                        />
                        <input
                            type="password"
                            name="confirm"
                            placeholder="Confirm new password"
                            value={pwForm.confirm}
                            onChange={handlePwChange}
                            className="security_input"
                        />
                        {pwError && <p className="error_msg">{pwError}</p>}
                        <div className="bio_actions">
                            <button className="save_btn" onClick={submitPassword}>Save</button>
                            <button className="cancel_btn" onClick={() => { setChangingPassword(false); setPwError(""); }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Change Email */}
            <div className="security_card">
                <div className="security_card_header">
                    <div>
                        <h3 className="security_card_title">Email Address</h3>
                        <p className="security_card_sub">Change the email linked to your account</p>
                    </div>
                    {!changingEmail && (
                        <button className="change_pic_btn" onClick={() => { setChangingEmail(true); setEmailSuccess(""); }}>
                            Change
                        </button>
                    )}
                </div>

                {emailSuccess && <p className="success_msg">{emailSuccess}</p>}

                {changingEmail && (
                    <div className="security_form">
                        <input
                            type="email"
                            name="newEmail"
                            placeholder="New email address"
                            value={emailForm.newEmail}
                            onChange={handleEmailChange}
                            className="security_input"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Confirm with your password"
                            value={emailForm.password}
                            onChange={handleEmailChange}
                            className="security_input"
                        />
                        {emailError && <p className="error_msg">{emailError}</p>}
                        <div className="bio_actions">
                            <button className="save_btn" onClick={submitEmail}>Save</button>
                            <button className="cancel_btn" onClick={() => { setChangingEmail(false); setEmailError(""); }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Danger Zone */}
            <div className="security_card danger_card">
                <div className="security_card_header">
                    <div>
                        <h3 className="security_card_title danger_title">Delete Account</h3>
                        <p className="security_card_sub">Permanently delete your account and all data</p>
                    </div>
                    <button className="delete_btn">Delete</button>
                </div>
            </div>

        </div>
    )
}


const ACCENT_COLORS = [
    { name: "Red",    accent: "#e05555", hover: "#c03333", muted: "rgb(55,30,30)",  faint: "rgba(224,85,85,0.12)",  border: "rgba(224,85,85,0.35)"  },
    { name: "Blue",   accent: "#4488ff", hover: "#2266dd", muted: "rgb(20,35,70)",  faint: "rgba(68,136,255,0.12)", border: "rgba(68,136,255,0.35)" },
    { name: "Purple", accent: "#9955ee", hover: "#7733cc", muted: "rgb(40,20,65)",  faint: "rgba(153,85,238,0.12)", border: "rgba(153,85,238,0.35)" },
    { name: "Green",  accent: "#44bb77", hover: "#339955", muted: "rgb(20,50,30)",  faint: "rgba(68,187,119,0.12)", border: "rgba(68,187,119,0.35)" },
    { name: "Orange", accent: "#ff8833", hover: "#dd6611", muted: "rgb(60,30,10)",  faint: "rgba(255,136,51,0.12)", border: "rgba(255,136,51,0.35)" },
    { name: "Pink",   accent: "#ee4499", hover: "#cc2277", muted: "rgb(60,15,35)",  faint: "rgba(238,68,153,0.12)", border: "rgba(238,68,153,0.35)" },
];

const BG_THEMES = [
    { name: "Deep",     base: "rgb(10,5,5)",    elevated: "rgb(18,10,10)",  card: "rgb(31,21,21)",  border: "rgb(35,20,20)",  preview: "#0a0505" },
    { name: "Dark",     base: "rgb(12,12,12)",   elevated: "rgb(20,20,20)",  card: "rgb(32,32,32)",  border: "rgb(40,40,40)",  preview: "#0c0c0c" },
    { name: "Slate",    base: "rgb(8,10,16)",    elevated: "rgb(14,18,28)", card: "rgb(22,28,44)",  border: "rgb(30,36,55)",  preview: "#080a10" },
    { name: "Charcoal", base: "rgb(16,16,16)",   elevated: "rgb(24,24,24)",  card: "rgb(36,36,36)",  border: "rgb(45,45,45)",  preview: "#101010" },
];

function applyTheme({ accent, hover, muted, faint, border, base, elevated, card, bgBorder }) {
    const r = document.documentElement;
    if (accent)   r.style.setProperty("--accent",        accent);
    if (hover)    r.style.setProperty("--accent-hover",  hover);
    if (muted)    r.style.setProperty("--accent-muted",  muted);
    if (faint)    r.style.setProperty("--accent-faint",  faint);
    if (border)   r.style.setProperty("--accent-border", border);
    if (base)     r.style.setProperty("--bg-base",       base);
    if (elevated) r.style.setProperty("--bg-elevated",   elevated);
    if (card)     r.style.setProperty("--bg-card",       card);
    if (bgBorder) r.style.setProperty("--bg-border",     bgBorder);
}

function Personalize(){
    const saved = JSON.parse(localStorage.getItem("netclone_theme") || "{}");
    const [accentIdx, setAccentIdx] = useState(
        ACCENT_COLORS.findIndex(c => c.accent === saved.accent) ?? 0
    );
    const [bgIdx, setBgIdx] = useState(
        BG_THEMES.findIndex(b => b.base === saved.base) ?? 0
    );

    function pickAccent(i) {
        setAccentIdx(i);
        const c = ACCENT_COLORS[i];
        applyTheme({ accent: c.accent, hover: c.hover, muted: c.muted, faint: c.faint, border: c.border });
        const prev = JSON.parse(localStorage.getItem("netclone_theme") || "{}");
        localStorage.setItem("netclone_theme", JSON.stringify({ ...prev, ...c }));
    }

    function pickBg(i) {
        setBgIdx(i);
        const b = BG_THEMES[i];
        applyTheme({ base: b.base, elevated: b.elevated, card: b.card, bgBorder: b.border });
        const prev = JSON.parse(localStorage.getItem("netclone_theme") || "{}");
        localStorage.setItem("netclone_theme", JSON.stringify({ ...prev, base: b.base, elevated: b.elevated, card: b.card, bgBorder: b.border }));
    }

    return(
        <div className="personalize_container">
            <h2 className="personalize_title">Personalize</h2>

            {/* Accent color */}
            <div className="personalize_card">
                <div>
                    <h3 className="personalize_card_title">Accent Color</h3>
                    <p className="personalize_card_sub">Changes buttons, active states, and highlights across the app</p>
                </div>
                <div className="color_options">
                    {ACCENT_COLORS.map((c, i) => (
                        <button
                            key={c.name}
                            className={`color_swatch ${i === accentIdx ? "selected" : ""}`}
                            style={{ background: c.accent }}
                            title={c.name}
                            onClick={() => pickAccent(i)}
                        />
                    ))}
                </div>
            </div>

            {/* Background */}
            <div className="personalize_card">
                <div>
                    <h3 className="personalize_card_title">Background</h3>
                    <p className="personalize_card_sub">Change the darkness and tone of the page background</p>
                </div>
                <div className="bg_options">
                    {BG_THEMES.map((b, i) => (
                        <div
                            key={b.name}
                            className={`bg_option ${i === bgIdx ? "selected" : ""}`}
                            onClick={() => pickBg(i)}
                        >
                            <div className="bg_preview" style={{ background: b.preview }} />
                            <span className="bg_label">{b.name}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}


function  History({user_info}){
    const [history, setHistory] = useState([]);


    async function  getUserWatchHistory(user_id){
        try{
            const res = await fetch("http://localhost:3000/movies/user/watch_history",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({user_id}),
            })
            if (!res.ok) {
                throw new Error("No History found for current user");
            }
            const user_watch_history = await res.json()
            // console.log(user_watch_history);
            return user_watch_history;
        }catch(err){
            console.error("Error: ",err)
        }
    }

    useEffect(() => {
        async function fetchHistory() {
            const data = await getUserWatchHistory(user_info.id);
            // console.log(data.message[0])
            setHistory(data.message);
            // console.log(history);
        }

        fetchHistory();
    }, [user_info]);

    return (
        <div className="history_container">
            <div className="history_header">
                <div>
                    <h2 className="history_title">Recently Watched</h2>
                    <p className="history_sub">{history.length} {history.length === 1 ? "title" : "titles"} in your history</p>
                </div>
            </div>

            {history.length === 0 ? (
                <div className="history_empty">
                    <span className="history_empty_icon">🎬</span>
                    <p>No watch history yet.</p>
                    <span className="history_empty_hint">Movies and shows you watch will appear here.</span>
                </div>
            ) : (
                <MoviesWraped historyList={history}/>
            )}
        </div>
    );
}

export {History,PersonalInfo,Personalize,Security}

