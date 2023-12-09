import{a as s,b as c}from"./main-877d79b8.js";let d=[],o=[];const m=document.querySelector(".productWrap"),x=document.querySelector(".productSelect"),$=document.querySelector(".shoppingCartList"),L=document.querySelector(".discardAllBtn");function E(){T(),u()}E();function T(){axios.get(`${s}/${c}/products`).then(function(t){d=t.data.products,console.log(d),S(),b()}).catch(function(t){console.log(t),alert(`${t.response.status}錯誤`)})}function h(t){return`<li class="productCard">
  <h4 class="productType">新品</h4>
  <img
  src="${t.images}"
  alt="${t.title}">
  <a href="#" class="addCardBtn js-addCart" data-id="${t.id}">加入購物車</a>
  <h3>${t.title}</h3>
  <del class="originPrice">NT$${l(t.origin_price)}</del>
  <p class="nowPrice">NT$${l(t.price)}</p>
  </li>`}function S(){let t="";d.forEach(function(e){t+=h(e),m.innerHTML=t})}function b(){x.addEventListener("change",function(t){if(console.log(t.target.value),t.target.value==="全部"){S();return}let e="";d.forEach(function(n){t.target.value===n.category&&(e+=h(n),m.innerHTML=e)})})}m.addEventListener("click",function(t){if(t.preventDefault(),t.target.getAttribute("class")!=="addCardBtn js-addCart"){alert("點錯地方了");return}let n=t.target.getAttribute("data-id");console.log(n);let r=1;o.forEach(function(a){a.product.id===n&&(r=a.quantity+1)}),console.log(r),axios.post(`${s}/${c}/carts`,{data:{productId:n,quantity:r}}).then(function(a){console.log(a),alert("加入購物車!"),u()}).catch(function(a){console.log(a),alert(`${a.response.status}錯誤`)})});function u(){axios.get(`${s}/${c}/carts`).then(function(t){o=t.data.carts,console.log(t.data),document.querySelector(".js-finalTotal").textContent=l(t.data.finalTotal);let e="";o.length===0&&(e=`
        <tr>
        <td colspan="5" class="text-center fs-3 text-danger">目前購物車無資料</td>
      </tr>
        `),o.forEach(function(n){e+=`
        <tr>
        <td>
          <div class="cardItem-title">
            <img src="${n.product.images}" alt="">
            <p>${n.product.title}</p>
          </div>
        </td>
        <td>NT$${l(n.product.price)}</td>
        <td>${n.quantity}</td>
        <td>NT$${l(n.product.price*n.quantity)}</td>
        <td class="discardBtn">
          <a href="#" class="material-icons" data-id="${n.id}" data-title="${n.product.title}" data-cart-num="${n.quantity}">
            clear
          </a>
        </td>
      </tr>
        `}),$.innerHTML=e}).catch(function(t){console.log(t),alert(`${t.response.status} 錯誤`)})}function A(){$.addEventListener("click",function(t){t.preventDefault();let e=t.target.getAttribute("data-id"),n=t.target.getAttribute("data-title"),r=t.target.getAttribute("data-cart-num");console.log(r),e===null&&alert("你點到其他地方了"),axios.delete(`${s}/${c}/carts/${e}`).then(function(a){console.log(a),alert(`刪除單筆購物車資料成功：${n} ${r}個`),u()}).catch(function(a){console.log(a),alert(`${a.response.status}錯誤`)})})}A();function C(){L.addEventListener("click",function(t){t.preventDefault(),console.log(t.target),axios.delete(`${s}/${c}/carts`).then(function(e){console.log(e),alert("刪除全部購物車資料成功"),u()}).catch(function(e){console.log(e),alert("購物車已清空，請勿重複點擊")})})}C();const P=document.querySelector(".orderInfo-btn");P.addEventListener("click",function(t){if(t.preventDefault(),console.log(t.target),o.length===0){alert("請加入購物車");return}const e=document.querySelector("#customerName").value,n=document.querySelector("#customerPhone").value,r=document.querySelector("#customerEmail").value,a=document.querySelector("#customerAddress").value,i=document.querySelector("#tradeWay").value;if(console.log(e,n,a,r,i),e===""||n===""||a===""||r===""||i===""){alert("請輸入訂單資訊");return}if(q(r)==!1){alert("請填寫正確的Email");return}axios.post(`${s}/${c}/orders`,{data:{user:{name:e,tel:n,email:r,address:a,payment:i}}}).then(function(f){alert("訂單建立成功"),document.querySelector("#customerName").value="",document.querySelector("#customerPhone").value="",document.querySelector("#customerEmail").value="",document.querySelector("#customerAddress").value="",document.querySelector("#tradeWay").value="ATM",u()}).catch(function(f){console.log(f),alert(`${f.response.status}錯誤`)})});const g=document.querySelector("#customerName");g.addEventListener("blur",function(t){if(j(g.value)==!1)document.querySelector("[data-message=姓名]").innerHTML=`<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確中文姓名格式</div>`;else{document.querySelector("[data-message=姓名]").innerHTML=`<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check
    </span> 已填寫正確</div>`;return}});const p=document.querySelector("#customerEmail");p.addEventListener("blur",function(t){if(q(p.value)==!1){document.querySelector("[data-message=Email]").innerHTML=`<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確Email格式</div>`;return}else{document.querySelector("[data-message=Email]").innerHTML=`<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check
    </span> 已填寫正確</div>`;return}});const y=document.querySelector("#customerPhone");y.addEventListener("blur",function(t){if(M(y.value)==!1){document.querySelector("[data-message=電話]").innerHTML=`<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確電話格式</div>`;return}else{document.querySelector("[data-message=電話]").innerHTML=`<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check</span> 已填寫正確</div>`;return}});const v=document.querySelector("#customerAddress");v.addEventListener("blur",function(t){if(H(v.value)==!1){document.querySelector("[data-message=寄送地址]").innerHTML=`<div class="d-flex justify-content-cneter text-danger"><span class="material-symbols-outlined">
    error
    </span> 請填寫正確地址格式</div>`;return}else{document.querySelector("[data-message=寄送地址]").innerHTML=`<div class="d-flex justify-content-cneter text-success"><span class="material-symbols-outlined text-success">
    check</span> 已填寫正確</div>`;return}});function l(t){let e=t.toString().split(".");return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),e.join(".")}function q(t){return!!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(t)}function M(t){return!!/^09\d{8}$/.test(t)}function j(t){return!!/^[\u4e00-\u9fa5]{2,4}$/.test(t)}function H(t){return!!/^(台灣省|臺灣省|台灣|臺灣|台北市|新北市|基隆市|宜蘭縣|桃園市|新竹市|新竹縣|苗栗縣|台中市|臺中市|彰化縣|南投縣|嘉義市|嘉義縣|台南市|臺南市|高雄市|屏東縣|台東縣|花蓮縣|澎湖縣|金門縣|連江縣)(?:\S{1,2}[市縣]\S{1,10}[鄉鎮市區]\S{1,10}[村里]\S{1,10})?/.test(t)}
