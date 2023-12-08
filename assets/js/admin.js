import { token, api_url, api_url2, api_path } from "./config.js";
// https://livejs-api.hexschool.io/api/livejs/v1/admin/yuling-2023js/orders
let orderData =[];
function getOrderList() {
  axios
    .get(`${api_url2}/admin/${api_path}/orders`, {
      headers: {
        Authorization: token,
      },
    })
    .then(function (response) {
        orderData = response.data.orders;
        console.log(orderData);
    })
    .catch(function (error) {
      console.log(error);
      alert(`${error.response.status}錯誤`);
    });
}
getOrderList();
