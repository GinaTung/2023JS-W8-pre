import { token, api_url, api_path } from "./config.js";
// console.log(token, api_url);
let productData = [];
let cartData = [];
const productList = document.querySelector(".productWrap");
const productSelect = document.querySelector(".productSelect");
const cartList = document.querySelector(".shoppingCartList");
const discardAllBtn = document.querySelector(".discardAllBtn");

//初始化
function init() {
  getProductList();
  getCartList();
}
init();

//產品列表
function getProductList() {
  axios
    .get(`${api_url}/${api_path}/products`)
    .then(function (response) {
      // console.log(response);
      productData = response.data.products;
      console.log(productData);
      renderProducts();
      changeProducts();
    })
    .catch(function (error) {
      console.log(error);
      alert(`${error.response.status}錯誤`);
    });
}
//組合列表
function combineProductHTMLItem(item) {
  return `<li class="productCard">
  <h4 class="productType">新品</h4>
  <img
  src="${item.images}"
  alt="${item.title}">
  <a href="#" class="addCardBtn js-addCart" data-id="${item.id}">加入購物車</a>
  <h3>${item.title}</h3>
  <del class="originPrice">NT$${item.origin_price}</del>
  <p class="nowPrice">NT$${item.price}</p>
  </li>`;
}
//渲染
function renderProducts() {
  let str = "";
  productData.forEach(function (item) {
    str += combineProductHTMLItem(item);
    productList.innerHTML = str;
  });
}
//監聽篩選
function changeProducts() {
  productSelect.addEventListener("change", function (e) {
    console.log(e.target.value);
    if (e.target.value === "全部") {
      renderProducts();
      return;
    }
    let str = "";
    productData.forEach(function (item) {
      if (e.target.value === item.category) {
        str += combineProductHTMLItem(item);
        productList.innerHTML = str;
      }
    });
  });
}
//監聽點選加入購物車
productList.addEventListener("click", function (e) {
  // console.log(e.target.value);
  e.preventDefault();
  let addCartClass = e.target.getAttribute("class");
  if (addCartClass !== "addCardBtn js-addCart") {
    alert("點錯地方了");
    return;
  }
  //點選加入購物車按鈕後產生產品ID
  let productId = e.target.getAttribute("data-id");
  console.log(productId);

  //加入購物車數量增加
  let checkNum = 1;
  //發現點選加入購物車按鈕後，此按鈕產生產品ID與購物車清單資料產品ID相符時，產品購買數量+1
  cartData.forEach(function (item) {
    if (item.product.id === productId) {
      checkNum = item.quantity + 1;
    }
  });
  console.log(checkNum);

  axios
    .post(`${api_url}/${api_path}/carts`, {
      data: {
        productId: productId,
        quantity: checkNum,
      },
    })
    .then(function (response) {
      console.log(response);
      alert("加入購物車!");
      getCartList();
    })
    .catch(function (error) {
      console.log(error);
      alert(`${error.response.status}錯誤`);
    });
});
//取得購物車資料
function getCartList() {
  axios
    .get(`${api_url}/${api_path}/carts`)
    .then(function (response) {
      cartData = response.data.carts;
      console.log(response.data);
      document.querySelector(".js-finalTotal").textContent =
        response.data.finalTotal;
      let str = "";
      if (cartData.length === 0) {
        str = `
        <tr>
        <td colspan="5" class="text-center fs-3 text-danger">目前購物車無資料</td>
      </tr>
        `;
      }
      cartData.forEach(function (item) {
        str += `
        <tr>
        <td>
          <div class="cardItem-title">
            <img src="${item.product.images}" alt="">
            <p>${item.product.title}</p>
          </div>
        </td>
        <td>NT$${item.product.price}</td>
        <td>${item.quantity}</td>
        <td>NT$${item.product.price * item.quantity}</td>
        <td class="discardBtn">
          <a href="#" class="material-icons" data-id="${item.id}" data-title="${
          item.product.title}" data-cart-num="${item.quantity}">
            clear
          </a>
        </td>
      </tr>
        `;
      });
      cartList.innerHTML = str;
    })
    .catch(function (error) {
      console.log(error);
      alert(`${error.response.status} 錯誤`);
    });
}
//刪除單筆購物車資料
function deleteCartItem() {
  cartList.addEventListener("click", function (e) {
    e.preventDefault();
    let cartId = e.target.getAttribute("data-id");
    let cartProductTitle = e.target.getAttribute("data-title");
    let cartProductNum = e.target.getAttribute("data-cart-num");
    console.log(cartProductNum);
    if (cartId === null) {
      alert("你點到其他地方了");
    }
    axios
      .delete(`${api_url}/${api_path}/carts/${cartId}`)
      .then(function (response) {
        console.log(response);
        alert(`刪除單筆購物車資料成功：${cartProductTitle} ${cartProductNum}個`);
        getCartList();
      })
      .catch(function (error) {
        console.log(error);
        alert(`${error.response.status}錯誤`);
      });
  });
}
deleteCartItem();
//刪除全部購物車資料
function deleteAllCarts() {
  discardAllBtn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target);
    axios
      .delete(`${api_url}/${api_path}/carts`)
      .then(function (response) {
        console.log(response);
        alert(`刪除全部購物車資料成功`);
        getCartList();
      })
      .catch(function (error) {
        console.log(error);
        alert("購物車已清空，請勿重複點擊");
      });
  });
}
deleteAllCarts();

//送出訂單
const orderInfobtn =document.querySelector(".orderInfo-btn");
orderInfobtn.addEventListener("click",function(e){
  e.preventDefault();
  console.log(e.target);
  if(cartData.length === 0 ){
    alert("請加入購物車");
    return
  }else{
    alert("你購物車有資料，填寫正確")
  }
})