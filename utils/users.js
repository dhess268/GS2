let users = []

function userJoin(id, username, room, color){
    const user = {
        username: username,
        id: id,
        room: room,
        color: color
    }
    users.push(user)
    // console.log(user)
    return user
}


function getCurrentUser(id){
    // console.log(users.find(user => {    
    //     console.log(user.id)
    //     console.log(id)
    //     console.log(id === user.id)
    //     user.id === id
    // }))
    // let newUser = users.find(user =>{
    //     return id === user.id
    // })
    // console.log(newUser)

    return users.find(user => {
        return user.id === id
    })
    
}

function userLeave(id){
    const index = users.findIndex(user => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

// get room users
function getUsers(room){
    return users.filter(user => user.room === room)
}


module.exports = {
    userJoin, 
    getCurrentUser,
    userLeave,
    getUsers
};