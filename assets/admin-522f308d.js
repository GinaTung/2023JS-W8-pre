import{c as s,b as o,t as d}from"./main-20ca5724.js";let c=[];const h=document.querySelector(".js-orderList"),$=document.querySelector(".discardAllBtn");function g(){l()}g();function l(){axios.get(`${s}/admin/${o}/orders`,{headers:{Authorization:d}}).then(function(t){c=t.data.orders;let a="";c.forEach(e=>{const r=new Date(e.createdAt*1e3),n=`${r.getFullYear()}/${r.getMonth()}/${r.getDate()}`;let u="";e.products.forEach(f=>{u+=`
            <p>${f.title} x${f.quantity}</p>
            `});let i="";e.paid==!0?i="已處理":i="未處理",a+=`
            <tr>
            <td>${e.createdAt}</td>
            <td>
              <p>${e.user.name}</p>
              <p>${e.user.tel}</p>
            </td>
            <td>${e.user.address}</td>
            <td>${e.user.email}</td>
            <td>
              ${u}
            </td>
            <td>${n}</td>
            <td class="orderStatus">
              <a href="#" class="js-orderStatus" data-status="${e.paid}" data-id="${e.id}">${i}</a>
            </td>
            <td>
              <input type="button" class="delSingleOrder-Btn js-orderDelete" value="刪除" data-id="${e.id}">
            </td>
          </tr>
            `}),h.innerHTML=a,p()}).catch(function(t){console.log(t),alert(`${t.response.status}錯誤`)})}function p(){let t={};c.forEach(r=>{r.products.forEach(n=>{t[n.category]==null?t[n.category]=n.price*n.quantity:t[n.category]+=n.price*n.quantity})}),console.log(t);let a=Object.keys(t),e=[];a.forEach(r=>{let n=[];n.push(r),n.push(t[r]),e.push(n)}),c3.generate({bindto:"#chart",data:{type:"pie",columns:e,colors:{"Louvre 雙人床架":"#DACBFF","Antony 雙人床架":"#9D7FEA","Anty 雙人床架":"#5434A7",其他:"#301E5F"}}})}h.addEventListener("click",function(t){t.preventDefault();const a=t.target.getAttribute("class");let e=t.target.getAttribute("data-status"),r=t.target.getAttribute("data-id");if(a=="delSingleOrder-Btn js-orderDelete"){y(r);return}if(a=="js-orderStatus"){A(e,r);return}});function A(t,a){console.log(t,a);let e;t==!0?e=!1:e=!0,axios.put(`${s}/admin/${o}/orders`,{data:{id:a,paid:e}},{headers:{Authorization:d}}).then(function(r){console.log(r),alert("修改訂單成功"),l()}).catch(function(r){console.log(r),alert(`${r.response.status}錯誤`)})}function y(t){axios.delete(`${s}/admin/${o}/orders/${t}`,{headers:{Authorization:d}}).then(function(a){console.log(a),alert("刪除該筆訂單成功"),l()}).catch(function(a){console.log(a),alert(`${a.response.status}錯誤`)})}function S(){$.addEventListener("click",function(t){axios.delete(`${s}/admin/${o}/orders`,{headers:{Authorization:d}}).then(function(a){alert("刪除全部訂單成功"),l()}).catch(function(a){console.log(a),alert(`${a.response.status}錯誤`)})})}S();
