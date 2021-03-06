const remoteURL = "https://api.codearchive.net";

export default {
  get(database, id) {
    return fetch(`${remoteURL}/${database}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("codearchive_token")}`
      }
    }).then(data => data.json());
  },
  getAll(database, queryParams) {
    let url = `${remoteURL}/${database}`;
    if (queryParams) {
      url += `?${queryParams}`;
    }
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("codearchive_token")}`
      }
    }).then(data => data.json());
  },
  delete(database, id) {
    return fetch(`${remoteURL}/${database}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("codearchive_token")}`
      }
    })
  },
  post(database, newData) {
    return fetch(`${remoteURL}/${database}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("codearchive_token")}`
      },
      body: JSON.stringify(newData)
    }).then(data => data.json());
  },
  put(database, editedItem) {
    return fetch(`${remoteURL}/${database}/${editedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("codearchive_token")}`
      },
      body: JSON.stringify(editedItem)
    })
  },
  getGoogle(query, key) {
    return fetch(
      `https://www.googleapis.com/customsearch/v1?q=${query}&cx=007869700174917727814%3Awkw-90jpq8q&num=5&key=${key}`
    ).then(data => data.json());
  }
};
