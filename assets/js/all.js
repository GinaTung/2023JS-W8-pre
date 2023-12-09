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
  <del class="originPrice">NT$${toRhousands(item.origin_price)}</del>
  <p class="nowPrice">NT$${toRhousands(item.price)}</p>
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
      toRhousands(response.data.finalTotal);
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
        <td>NT$${toRhousands(item.product.price)}</td>
        <td>${item.quantity}</td>
        <td>NT$${toRhousands(item.product.price * item.quantity)}</td>
        <td class="discardBtn">
          <a href="#" class="material-icons" data-id="${item.id}" data-title="${
          item.product.title
        }" data-cart-num="${item.quantity}">
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
        alert(
          `刪除單筆購物車資料成功：${cartProductTitle} ${cartProductNum}個`
        );
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
const orderInfobtn = document.querySelector(".orderInfo-btn");
orderInfobtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  if (cartData.length === 0) {
    alert("請加入購物車");
    return;
  }
  const customerName = document.querySelector("#customerName").value;
  const customerPhone = document.querySelector("#customerPhone").value;
  const customerEmail = document.querySelector("#customerEmail").value;
  const customerAddress = document.querySelector("#customerAddress").value;
  const customerTradeWay = document.querySelector("#tradeWay").value;
  console.log(
    customerName,
    customerPhone,
    customerAddress,
    customerEmail,
    customerTradeWay
  );
  if (
    customerName === "" ||
    customerPhone === "" ||
    customerAddress === "" ||
    customerEmail === "" ||
    customerTradeWay === ""
  ) {
    alert("請輸入訂單資訊");
    return;
  }
  //判斷Email是否填寫正確
  if(validateEmail(customerEmail) == false){
    alert("請填寫正確的Email")
    return
  }
  axios
    .post(`${api_url}/${api_path}/orders`, {
      data: {
        user: {
          name: customerName,
          tel: customerPhone,
          email: customerEmail,
          address: customerAddress,
          payment: customerTradeWay,
        },
      },
    })
    .then(function (response) {
      alert("訂單建立成功");
      document.querySelector("#customerName").value = "";
      document.querySelector("#customerPhone").value = "";
      document.querySelector("#customerEmail").value = "";
      document.querySelector("#customerAddress").value = "";
      document.querySelector("#tradeWay").value = "ATM";
      getCartList();
    })
    .catch(function (error) {
      console.log(error);
      alert(`${error.response.status}錯誤`);
    });
});

//監聽姓名
const customerName = document.querySelector("#customerName");
customerName.addEventListener("blur",function(e){
  if(validateName(customerName.value) == false){
    document.querySelector(`[data-message=姓名]`).innerHTML = `<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確中文姓名格式</div>`;
  }else{
    document.querySelector(`[data-message=姓名]`).innerHTML = `<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check
    </span> 已填寫正確</div>`;
    return
  }
})

//監聽Email欄位
//判斷Email是否填寫正確，點選旁邊即可觸發
const customerEmail = document.querySelector("#customerEmail");
//聽為blur移開觸發(驗證電郵錯誤)
customerEmail.addEventListener("blur",function(e){
  if(validateEmail(customerEmail.value) == false){
    document.querySelector(`[data-message=Email]`).innerHTML = `<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確Email格式</div>`;
    return
  }else{
    document.querySelector(`[data-message=Email]`).innerHTML = `<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check
    </span> 已填寫正確</div>`;
    return
  }
})
//監聽電話
const customerPhone = document.querySelector("#customerPhone");
customerPhone.addEventListener("blur",function(e){
  if(validatePhone(customerPhone.value) ==false){
    document.querySelector(`[data-message=電話]`).innerHTML = `<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確電話格式</div>`;
    return
  }else{
    document.querySelector(`[data-message=電話]`).innerHTML = `<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check</span> 已填寫正確</div>`;
    return
  }
})
//監聽地址
const customerAddress = document.querySelector("#customerAddress");
customerAddress.addEventListener("blur",function(e){
  if(validateAddress(customerAddress.value) ==false){
    document.querySelector(`[data-message=寄送地址]`).innerHTML = `<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確地址格式</div>`;
    return
  }else{
    document.querySelector(`[data-message=寄送地址]`).innerHTML = `<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check</span> 已填寫正確</div>`;
    return
  }
})

//util js 千分位
function toRhousands(x) {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

//判斷Email是否填寫正確，點選送出訂單按鈕觸發
function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true
  }
    return false
}

//判斷手機號碼是否填寫正確，點選送出訂單按鈕觸發
function validatePhone(phone) 
{
 if (/^09\d{8}$/.test(phone))
  {
    return true
  }
    return false
}
//中文名字
function validateName(name) 
{
 if (/^[\u4e00-\u9fa5]{2,4}$/.test(name))
  {
    return true
  }
    return false
}


//地址
function validateAddress(address) 
{
  const taiwanAddressRegex = /^(台灣省|臺灣省|台灣|臺灣|台北市|新北市|基隆市|宜蘭縣|桃園市|新竹市|新竹縣|苗栗縣|台中市|臺中市|彰化縣|南投縣|嘉義市|嘉義縣|台南市|臺南市|高雄市|屏東縣|台東縣|花蓮縣|澎湖縣|金門縣|連江縣)(?:\S{1,2}[市縣]\S{1,10}[鄉鎮市區]\S{1,10}[村里]\S{1,10})?/;
 if (taiwanAddressRegex.test(address))
  {
    return true
  }
    return false
}
