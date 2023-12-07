import"./main-8ec943ba.js";const r="yuling-2023js",l="https://livejs-api.hexschool.io/api/livejs/v1/customer";let s=[],o=[];const i=document.querySelector(".productWrap"),p=document.querySelector(".productSelect"),u=document.querySelector(".shoppingCartList"),$=document.querySelector(".discardAllBtn");function h(){v(),d()}h();function v(){axios.get(`${l}/${r}/products`).then(function(t){s=t.data.products,console.log(s),g(),y()}).catch(function(t){console.log(t),alert(`${t.response.status}錯誤`)})}function f(t){return`<li class="productCard">
  <h4 class="productType">新品</h4>
  <img
  src="${t.images}"
  alt="${t.title}">
  <a href="#" class="addCardBtn js-addCart" data-id="${t.id}">加入購物車</a>
  <h3>${t.title}</h3>
  <del class="originPrice">NT$${t.origin_price}</del>
  <p class="nowPrice">NT$${t.price}</p>
  </li>`}function g(){let t="";s.forEach(function(a){t+=f(a),i.innerHTML=t})}function y(){p.addEventListener("change",function(t){if(console.log(t.target.value),t.target.value==="全部"){g();return}let a="";s.forEach(function(e){t.target.value===e.category&&(a+=f(e),i.innerHTML=a)})})}i.addEventListener("click",function(t){if(t.preventDefault(),t.target.getAttribute("class")!=="addCardBtn js-addCart"){alert("點錯地方了");return}let e=t.target.getAttribute("data-id");console.log(e);let n=1;o.forEach(function(c){c.product.id===e&&(n=c.quantity+1)}),console.log(n),axios.post(`${l}/${r}/carts`,{data:{productId:e,quantity:n}}).then(function(c){console.log(c),alert("加入購物車!"),d()}).catch(function(c){console.log(c),alert(`${c.response.status}錯誤`)})});function d(){axios.get(`${l}/${r}/carts`).then(function(t){o=t.data.carts,console.log(t.data),document.querySelector(".js-finalTotal").textContent=t.data.finalTotal;let a="";o.length===0&&(a=`
        <tr>
        <td colspan="5" class="text-center fs-3 text-danger">目前購物車無資料</td>
      </tr>
        `),o.forEach(function(e){a+=`
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
        `}),u.innerHTML=a}).catch(function(t){console.log(t),alert(`${t.response.status} 錯誤`)})}function C(){u.addEventListener("click",function(t){t.preventDefault();let a=t.target.getAttribute("data-id"),e=t.target.getAttribute("data-title"),n=t.target.getAttribute("data-cart-num");console.log(n),a===null&&alert("你點到其他地方了"),axios.delete(`${l}/${r}/carts/${a}`).then(function(c){console.log(c),alert(`刪除單筆購物車資料成功：${e} ${n}個`),d()}).catch(function(c){console.log(c),alert(`${c.response.status}錯誤`)})})}C();function L(){$.addEventListener("click",function(t){t.preventDefault(),console.log(t.target),axios.delete(`${l}/${r}/carts`).then(function(a){console.log(a),alert("刪除全部購物車資料成功"),d()}).catch(function(a){console.log(a),alert("購物車已清空，請勿重複點擊")})})}L();const T=document.querySelector(".orderInfo-btn");T.addEventListener("click",function(t){if(t.preventDefault(),console.log(t.target),o.length===0){alert("請加入購物車");return}else alert("你購物車有資料，填寫正確")});
