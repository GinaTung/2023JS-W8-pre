import{a as r,b as n}from"./main-20ca5724.js";let s=[],l=[];const f=document.querySelector(".productWrap"),$=document.querySelector(".productSelect"),g=document.querySelector(".shoppingCartList"),h=document.querySelector(".discardAllBtn");function y(){v(),u()}y();function v(){axios.get(`${r}/${n}/products`).then(function(t){s=t.data.products,console.log(s),m(),q()}).catch(function(t){console.log(t),alert(`${t.response.status}錯誤`)})}function p(t){return`<li class="productCard">
  <h4 class="productType">新品</h4>
  <img
  src="${t.images}"
  alt="${t.title}">
  <a href="#" class="addCardBtn js-addCart" data-id="${t.id}">加入購物車</a>
  <h3>${t.title}</h3>
  <del class="originPrice">NT$${t.origin_price}</del>
  <p class="nowPrice">NT$${t.price}</p>
  </li>`}function m(){let t="";s.forEach(function(c){t+=p(c),f.innerHTML=t})}function q(){$.addEventListener("change",function(t){if(console.log(t.target.value),t.target.value==="全部"){m();return}let c="";s.forEach(function(e){t.target.value===e.category&&(c+=p(e),f.innerHTML=c)})})}f.addEventListener("click",function(t){if(t.preventDefault(),t.target.getAttribute("class")!=="addCardBtn js-addCart"){alert("點錯地方了");return}let e=t.target.getAttribute("data-id");console.log(e);let a=1;l.forEach(function(o){o.product.id===e&&(a=o.quantity+1)}),console.log(a),axios.post(`${r}/${n}/carts`,{data:{productId:e,quantity:a}}).then(function(o){console.log(o),alert("加入購物車!"),u()}).catch(function(o){console.log(o),alert(`${o.response.status}錯誤`)})});function u(){axios.get(`${r}/${n}/carts`).then(function(t){l=t.data.carts,console.log(t.data),document.querySelector(".js-finalTotal").textContent=t.data.finalTotal;let c="";l.length===0&&(c=`
        <tr>
        <td colspan="5" class="text-center fs-3 text-danger">目前購物車無資料</td>
      </tr>
        `),l.forEach(function(e){c+=`
        <tr>
        <td>
          <div class="cardItem-title">
            <img src="${e.product.images}" alt="">
            <p>${e.product.title}</p>
          </div>
        </td>
        <td>NT$${e.product.price}</td>
        <td>${e.quantity}</td>
        <td>NT$${e.product.price*e.quantity}</td>
        <td class="discardBtn">
          <a href="#" class="material-icons" data-id="${e.id}" data-title="${e.product.title}" data-cart-num="${e.quantity}">
            clear
          </a>
        </td>
      </tr>
        `}),g.innerHTML=c}).catch(function(t){console.log(t),alert(`${t.response.status} 錯誤`)})}function S(){g.addEventListener("click",function(t){t.preventDefault();let c=t.target.getAttribute("data-id"),e=t.target.getAttribute("data-title"),a=t.target.getAttribute("data-cart-num");console.log(a),c===null&&alert("你點到其他地方了"),axios.delete(`${r}/${n}/carts/${c}`).then(function(o){console.log(o),alert(`刪除單筆購物車資料成功：${e} ${a}個`),u()}).catch(function(o){console.log(o),alert(`${o.response.status}錯誤`)})})}S();function C(){h.addEventListener("click",function(t){t.preventDefault(),console.log(t.target),axios.delete(`${r}/${n}/carts`).then(function(c){console.log(c),alert("刪除全部購物車資料成功"),u()}).catch(function(c){console.log(c),alert("購物車已清空，請勿重複點擊")})})}C();const L=document.querySelector(".orderInfo-btn");L.addEventListener("click",function(t){if(t.preventDefault(),console.log(t.target),l.length===0){alert("請加入購物車");return}const c=document.querySelector("#customerName").value,e=document.querySelector("#customerPhone").value,a=document.querySelector("#customerEmail").value,o=document.querySelector("#customerAddress").value,d=document.querySelector("#tradeWay").value;if(console.log(c,e,o,a,d),c===""||e===""||o===""||a===""||d===""){alert("請輸入訂單資訊");return}axios.post(`${r}/${n}/orders`,{data:{user:{name:c,tel:e,email:a,address:o,payment:d}}}).then(function(i){alert("訂單建立成功"),document.querySelector("#customerName").value="",document.querySelector("#customerPhone").value="",document.querySelector("#customerEmail").value="",document.querySelector("#customerAddress").value="",document.querySelector("#tradeWay").value="ATM",u()}).catch(function(i){console.log(i),alert(`${i.response.status}錯誤`)})});
