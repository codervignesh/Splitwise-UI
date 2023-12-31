const local = "http://localhost"  
const net = "http://10.30.1.178"
const gateway = "http://10.30.1.140"

const url = net

const groupService = url+":8081"    //8081
const expenseService = url+":8089"    //8089
const notificationService = url+":8085"   //8085

// const header = {
//   "Content-Type": "application/json",
//   "Authorization": localStorage.getItem("token"),
//   "User-Id": localStorage.getItem("userId")
// }

  const login = (loginDetails) => {
    return fetch(groupService+"/httpmethod/login", {  //8081
      method: "POST",
      body: JSON.stringify(loginDetails),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  };

  const logout = (logoutDetails) => {
    return fetch(groupService+"/httpmethod/logout", {    //8081
      method: "POST",
      body: JSON.stringify(logoutDetails),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };
  
  const getAllGroups = (userId) => {
    return fetch(groupService+"/httpmethod/group-list/" + userId, {     //8081  
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const getCategoryList = () => {
    return fetch(expenseService+"/httpmethod/category-list/" ,{     //8081  
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };
  const getGroupByName = (name) => {
    return fetch(groupService+"/httpmethod/filter-group/" + name, {     //8081  
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };
  const getUsersByName = (name) => {
    return fetch(groupService+"/httpmethod/filter-user/" + name, {     //8081  
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };
  const getAllExpenses = (groupId) => {
    return fetch(expenseService+"/httpmethod/expense-list/" + groupId, {     //8089
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  // http://localhost:8089/httpmethod/add/non-group-expense
  const getExpensesByUser = (creatorId, receiverId) => {
    return fetch(expenseService+"/httpmethod/non-group-expenses/" + creatorId + "/" + receiverId, {     //8089
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const getNotifications = (userId) => {
    return fetch(notificationService+"/httpmethod/notify-list/" + userId, {     //8085
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };
  
  const getAllExpensesByCategory = (groupId, category) => {
    // const url = `http://localhost:8089/httpmethod/filter-group-category?groupId=${groupId}&category=${category}`;  
    // const url = `http://10.30.1.178:8089/httpmethod/filter-group-category?groupId=${groupId}&category=${category}`;  
    const url1 = `${url}:8089/httpmethod/filter-group-category?groupId=${groupId}&category=${category}`;  
    return fetch(url1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };
  
  const getAllUsers = (userId) => {
    let url1 = groupService+"/httpmethod/user-list/"
    if(userId != 0)
      url1 = url1 + userId
    return fetch(url1, {   //8081
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const getGroupDetails = (groupId) => {
    return fetch(groupService+"/httpmethod/group-details/" + groupId, {  //8081
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  // http://localhost:8081/httpmethod/user-details/2
  const getUserDetails = (userId) => {
    return fetch(groupService+"/httpmethod/user-details/" + userId, {  //8081
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const getGroupMembers = (groupId) => {
    return fetch(groupService+"/httpmethod/group-member/" + groupId, {   //8081
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const getGroupReport = (userId) => {
    return fetch(expenseService+"/httpmethod/filter-amount/" + userId, {     //8089
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const getCategoryReport = (userId) => {
    return fetch(expenseService+"/httpmethod/filter/user-category/" + userId, {  //8089
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const addExpense = (expenseDetails) => {
    return fetch(expenseService+"/httpmethod/add/expense", {     //8089
      method: "POST",
      body: JSON.stringify(expenseDetails),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  // addExpenseUser

  const addExpenseUser = (expenseDetails) => {
    return fetch(expenseService+"/httpmethod/add/non-group-expense", {     //8089
      method: "POST",
      body: JSON.stringify(expenseDetails),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const payExpense = (expenseId, userId) => {    //8089
    return fetch(expenseService+"/httpmethod/payment/"+expenseId+"/"+userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const payExpenseUser = (expenseId, userId) => {    //8089
    return fetch(expenseService+"/httpmethod/non-group-pay/"+expenseId+"/"+userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };

  const readNotification = (notificationId) => {    //8085
    return fetch(notificationService+"/httpmethod/notify-read/"+notificationId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };
  

  const addGroup = (groupDetails, id) => {   //8081
    return fetch(groupService+"/httpmethod/add/group/" + id, {
      method: "POST",
      body: JSON.stringify(groupDetails),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };
  
  const updateGroup = (groupDetails, id) => {   //8081
    return fetch(groupService+"/httpmethod/update/group/" + id, {
      method: "PUT",
      body: JSON.stringify(groupDetails),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
        "User-Id": localStorage.getItem("userId")
      },
      mode: "cors",
    });
  };
  export default {
    login,
    getAllUsers,
    addGroup,
    getAllGroups,
    getAllExpenses,
    addExpense,
    getGroupMembers,
    payExpense,
    getAllExpensesByCategory,
    getNotifications,
    getGroupDetails,
    updateGroup,
    getGroupReport,
    getCategoryReport,
    readNotification,
    logout,
    getGroupByName,
    getCategoryList,
    getUserDetails,
    getExpensesByUser,
    payExpenseUser,
    addExpenseUser,
    getUsersByName,
  };
  