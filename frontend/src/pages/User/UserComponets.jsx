function PersonalInfo(){
    return(
        <div>
            <h1>This is Personal Info part</h1>
        </div>
    )
}

function Security(){
    return(
        <div>
            <h1>This is Security part</h1>
        </div>
    )
}


function Personalize(){
    return(
        <div>
            <h1>This is Personalize part</h1>
        </div>
    )
}


function History({user_info}){
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
            console.log(user_watch_history);
            return user_watch_history;
        }catch(err){
            console.error("Error: ",err)
        }
    }
    // console.log(user_info);

    let user_watch_history =null;
    getUserWatchHistory(user_info.id).then((res)=>user_watch_history=res);


    return(
        <div>
            <h1>This is History part</h1>
        </div>
    )
}

export {History,PersonalInfo,Personalize,Security}

