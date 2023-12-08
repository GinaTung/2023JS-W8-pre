import { token, api_url2, api_path } from "./config.js";
// https://livejs-api.hexschool.io/api/livejs/v1/admin/yuling-2023js/orders
let orderData = [];
const orderList = document.querySelector(".js-orderList");
const discardAllBtn =document.querySelector(".discardAllBtn");
//畫面初始化
function init() {
  getOrderList();
}
init();
//取得訂單資料
function getOrderList() {
  axios
    .get(`${api_url2}/admin/${api_path}/orders`, {
      headers: {
        Authorization: token,
      },
    })
    .then(function (response) {
      orderData = response.data.orders;
      let str = "";
      orderData.forEach((item) => {
        //組時間字串
        const timeStamp = new Date(item.createdAt * 1000);
        const orderTime = `${timeStamp.getFullYear()}/${timeStamp.getMonth()}/${timeStamp.getDate()}`;
        // console.log(orderTime);
        //組產品字串
        let productStr = "";
        item.products.forEach((productItem) => {
          productStr += `
            <p>${productItem.title} x${productItem.quantity}</p>
            `;
        });
        //判斷訂單狀態
        let orderStatus = "";
        if (item.paid == true) {
          orderStatus = "已處理";
        } else {
          orderStatus = "未處理";
        }
        str += `
            <tr>
            <td>${item.createdAt}</td>
            <td>
              <p>${item.user.name}</p>
              <p>${item.user.tel}</p>
            </td>
            <td>${item.user.address}</td>
            <td>${item.user.email}</td>
            <td>
              ${productStr}
            </td>
            <td>${orderTime}</td>
            <td class="orderStatus">
              <a href="#" class="js-orderStatus" data-status="${item.paid}" data-id="${item.id}">${orderStatus}</a>
            </td>
            <td>
              <input type="button" class="delSingleOrder-Btn js-orderDelete" value="刪除" data-id="${item.id}">
            </td>
          </tr>
            `;
      });
      orderList.innerHTML = str;
      renderC3();
    })
    .catch(function (error) {
      console.log(error);
      alert(`${error.response.status}錯誤`);
    });
}
function renderC3() {
  let total = {};
  orderData.forEach((item) => {
    item.products.forEach((productItem) => {
      if (total[productItem.category] == undefined) {
        total[productItem.category] = productItem.price * productItem.quantity;
      } else {
        total[productItem.category] += productItem.price * productItem.quantity;
      }
    });
  });
  console.log(total);
  //作資料關聯
  //物件轉陣列
  let categoryAry = Object.keys(total);
//   console.log(categoryAry);
//陣列轉陣列
  let newData = [];
  categoryAry.forEach((item) => {
    let ary = [];
    ary.push(item);
    ary.push(total[item]);
    newData.push(ary);
  });
//   console.log(newData);
  let chart = c3.generate({
    bindto: "#chart", // HTML 元素綁定
    data: {
      type: "pie",
      columns: newData,
      colors: {
        "Louvre 雙人床架": "#DACBFF",
        "Antony 雙人床架": "#9D7FEA",
        "Anty 雙人床架": "#5434A7",
        其他: "#301E5F",
      },
    },
  });
}
//監聽訂單列表狀態(刪除按鈕及資料狀態)
orderList.addEventListener("click", function (e) {
  e.preventDefault();
  //取得刪除按鈕資訊
  const targetClass = e.target.getAttribute("class");
  let status = e.target.getAttribute("data-status");
  let id = e.target.getAttribute("data-id");
  //   console.log(targetClass);
  if (targetClass == "delSingleOrder-Btn js-orderDelete") {
    // alert("你點擊到刪除按鈕了");
    deleteOrderItem(id);
    return;
  }
  //取得資料狀態訊息
  if (targetClass == "js-orderStatus") {
    changeOrderStatus(status, id);
    // alert("你點擊到資料處理狀態了");
    return;
  }
});
//訂單狀態處理
function changeOrderStatus(status, id) {
  console.log(status, id);
  let newStatus;
  if (status == true) {
    newStatus = false;
  } else {
    newStatus = true;
  }
  axios
    .put(
      `${api_url2}/admin/${api_path}/orders`,
      {
        data: {
          id: id,
          paid: newStatus,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      alert("修改訂單成功");
      getOrderList();
      return;
    })
    .catch(function (error) {
      console.log(error);
      alert(`${error.response.status}錯誤`);
    });
}
//刪除訂單按鈕
function deleteOrderItem(id) {
//   console.log(id);
  axios
    .delete(`${api_url2}/admin/${api_path}/orders/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then(function (response) {
      console.log(response);
      alert("刪除該筆訂單成功");
      getOrderList();
    })
    .catch(function (error) {
      console.log(error);
      alert(`${error.response.status}錯誤`);
    });
}

//刪除全部訂單按鈕
function deleteAllItem(){
    discardAllBtn.addEventListener("click",function(e){
        axios
        .delete(`${api_url2}/admin/${api_path}/orders`, {
          headers: {
            Authorization: token,
          },
        })
        .then(function (response) {
          alert("刪除全部訂單成功");
          getOrderList();
        })
        .catch(function (error) {
          console.log(error);
          alert(`${error.response.status}錯誤`);
        });
    })
}
deleteAllItem();