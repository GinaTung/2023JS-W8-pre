import{a as s,b as c}from"./main-877d79b8.js";let d=[],u=[];const i=document.querySelector(".productWrap"),E=document.querySelector(".productSelect"),$=document.querySelector(".shoppingCartList"),b=document.querySelector(".discardAllBtn");function A(){M(),l()}A();function M(){axios.get(`${s}/${c}/products`).then(function(e){d=e.data.products,S(),H()}).catch(function(e){alert(`${e.response.status}錯誤`)})}function h(e){return`<li class="productCard">
  <h4 class="productType">新品</h4>
  <img
  src="${e.images}"
  alt="${e.title}">
  <a href="#" class="addCardBtn js-addCart" data-id="${e.id}">加入購物車</a>
  <h3>${e.title}</h3>
  <del class="originPrice">NT$${o(e.origin_price)}</del>
  <p class="nowPrice">NT$${o(e.price)}</p>
  </li>`}function S(){let e="";d.forEach(function(t){e+=h(t),i.innerHTML=e})}function H(){E.addEventListener("change",function(e){if(e.target.value==="全部"){S();return}let t="";d.forEach(function(r){e.target.value===r.category&&(t+=h(r),i.innerHTML=t)})})}i.addEventListener("click",function(e){if(e.preventDefault(),e.target.getAttribute("class")!=="addCardBtn js-addCart"){alert("點錯地方了");return}let r=e.target.getAttribute("data-id"),n=1;u.forEach(function(a){a.product.id===r&&(n=a.quantity+1)}),axios.post(`${s}/${c}/carts`,{data:{productId:r,quantity:n}}).then(function(a){alert("加入購物車!"),l()}).catch(function(a){alert(`${a.response.status}錯誤`)})});function l(){axios.get(`${s}/${c}/carts`).then(function(e){u=e.data.carts,document.querySelector(".js-finalTotal").textContent=o(e.data.finalTotal);let t="";u.length===0&&(t=`
        <tr>
        <td colspan="5" class="text-center fs-3 text-danger">目前購物車無資料</td>
      </tr>
        `),u.forEach(function(r){t+=`
        <tr>
        <td>
          <div class="cardItem-title">
            <img src="${r.product.images}" alt="">
            <p>${r.product.title}</p>
          </div>
        </td>
        <td>NT$${o(r.product.price)}</td>
        <td>${r.quantity}</td>
        <td>NT$${o(r.product.price*r.quantity)}</td>
        <td class="discardBtn">
          <a href="#" class="material-icons" data-id="${r.id}" data-title="${r.product.title}" data-cart-num="${r.quantity}">
            clear
          </a>
        </td>
      </tr>
        `}),$.innerHTML=t}).catch(function(e){alert(`${e.response.status} 錯誤`)})}function C(){$.addEventListener("click",function(e){e.preventDefault();let t=e.target.getAttribute("data-id"),r=e.target.getAttribute("data-title"),n=e.target.getAttribute("data-cart-num");t===null&&alert("你點到其他地方了"),axios.delete(`${s}/${c}/carts/${t}`).then(function(a){alert(`刪除單筆購物車資料成功：${r} ${n}個`),l()}).catch(function(a){alert(`${a.response.status}錯誤`)})})}C();function P(){b.addEventListener("click",function(e){e.preventDefault(),axios.delete(`${s}/${c}/carts`).then(function(t){alert("刪除全部購物車資料成功"),l()}).catch(function(t){alert("購物車已清空，請勿重複點擊")})})}P();const j=document.querySelector(".orderInfo-btn");j.addEventListener("click",function(e){if(e.preventDefault(),u.length===0){alert("請加入購物車");return}const t=document.querySelector("#customerName").value,r=document.querySelector("#customerPhone").value,n=document.querySelector("#customerEmail").value,a=document.querySelector("#customerAddress").value,f=document.querySelector("#tradeWay").value;if(t===""||r===""||a===""||n===""||f===""){alert("請輸入訂單資訊");return}if(q(n)==!1){alert("請填寫正確的Email");return}if(L(t)==!1){alert("請填寫正確的中文姓名");return}if(x(r)==!1){alert("請填寫正確的電話");return}if(T(a)==!1){alert("請填寫正確的地址");return}axios.post(`${s}/${c}/orders`,{data:{user:{name:t,tel:r,email:n,address:a,payment:f}}}).then(function(m){alert("訂單建立成功"),document.querySelector("#customerName").value="",document.querySelector("#customerPhone").value="",document.querySelector("#customerEmail").value="",document.querySelector("#customerAddress").value="",document.querySelector("#tradeWay").value="ATM",document.querySelector("[data-message=姓名]").innerHTML="",document.querySelector("[data-message=電話]").innerHTML="",document.querySelector("[data-message=Email]").innerHTML="",document.querySelector("[data-message=寄送地址]").innerHTML="",l()}).catch(function(m){alert(`${m.response.status}錯誤`)})});const p=document.querySelector("#customerName");p.addEventListener("blur",function(e){if(L(p.value)==!1)document.querySelector("[data-message=姓名]").innerHTML=`<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確中文姓名格式</div>`;else{document.querySelector("[data-message=姓名]").innerHTML=`<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check
    </span> 已填寫正確</div>`;return}});const y=document.querySelector("#customerEmail");y.addEventListener("blur",function(e){if(q(y.value)==!1){document.querySelector("[data-message=Email]").innerHTML=`<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確Email格式</div>`;return}else{document.querySelector("[data-message=Email]").innerHTML=`<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check
    </span> 已填寫正確</div>`;return}});const v=document.querySelector("#customerPhone");v.addEventListener("blur",function(e){if(x(v.value)==!1){document.querySelector("[data-message=電話]").innerHTML=`<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確電話格式</div>`;return}else{document.querySelector("[data-message=電話]").innerHTML=`<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check</span> 已填寫正確</div>`;return}});const g=document.querySelector("#customerAddress");g.addEventListener("blur",function(e){if(T(g.value)==!1){document.querySelector("[data-message=寄送地址]").innerHTML=`<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確地址格式</div>`;return}else{document.querySelector("[data-message=寄送地址]").innerHTML=`<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check</span> 已填寫正確</div>`;return}});function o(e){let t=e.toString().split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t.join(".")}function q(e){return!!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)}function x(e){return!!/^09\d{8}$/.test(e)}function L(e){return!!/^[\u4e00-\u9fa5]{2,4}$/.test(e)}function T(e){return!!/^(台灣省|臺灣省|台灣|臺灣|台北市|新北市|基隆市|宜蘭縣|桃園市|新竹市|新竹縣|苗栗縣|台中市|臺中市|彰化縣|南投縣|嘉義市|嘉義縣|台南市|臺南市|高雄市|屏東縣|台東縣|花蓮縣|澎湖縣|金門縣|連江縣|雲林縣)(?:\S{1,2}[市縣]\S{1,10}[鄉鎮市區]\S{1,10}[村里]\S{1,10})?/.test(e)}
