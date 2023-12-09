import{c as l,b as i,t as c}from"./main-877d79b8.js";let s=[];const h=document.querySelector(".js-orderList"),g=document.querySelector(".discardAllBtn");function p(){d()}p();function d(){axios.get(`${l}/admin/${i}/orders`,{headers:{Authorization:c}}).then(function(a){s=a.data.orders;let r="";s.forEach(t=>{const n=new Date(t.createdAt*1e3),e=`${n.getFullYear()}/${n.getMonth()}/${n.getDate()}`;let o="";t.products.forEach(f=>{o+=`
            <p>${f.title} x${f.quantity}</p>
            `});let u="";t.paid==!0?u="已處理":u="未處理",r+=`
            <tr>
            <td>${t.createdAt}</td>
            <td>
              <p>${t.user.name}</p>
              <p>${t.user.tel}</p>
            </td>
            <td>${t.user.address}</td>
            <td>${t.user.email}</td>
            <td>
              ${o}
            </td>
            <td>${e}</td>
            <td class="orderStatus">
              <a href="#" class="js-orderStatus" data-status="${t.paid}" data-id="${t.id}">${u}</a>
            </td>
            <td>
              <input type="button" class="delSingleOrder-Btn js-orderDelete" value="刪除" data-id="${t.id}">
            </td>
          </tr>
            `}),h.innerHTML=r,$(),y()}).catch(function(a){console.log(a),alert(`${a.response.status}錯誤`)})}function $(){let a={};s.forEach(n=>{n.products.forEach(e=>{a[e.category]==null?a[e.category]=e.price*e.quantity:a[e.category]+=e.price*e.quantity})}),console.log(a);let r=Object.keys(a),t=[];r.forEach(n=>{let e=[];e.push(n),e.push(a[n]),t.push(e)}),c3.generate({bindto:"#chart",data:{type:"pie",columns:t},color:{pattern:["#301E5F","#5434A7","#DACBFF","#9D7FEA"]}})}function y(){let a={};console.log(s),s.forEach(n=>{n.products.forEach(e=>{console.log(e.price),a[e.title]==null?a[e.title]=e.price*e.quantity:a[e.title]+=e.price*e.quantity})});let r=Object.keys(a);console.log(r);let t=[];if(r.forEach(n=>{let e=[];e.push(n),e.push(a[n]),t.push(e)}),console.log(t),t.sort(function(n,e){return e[1]-n[1]}),t.length>3){let n=0;t.forEach(function(e,o){o>2&&(n+=t[o][1])}),t.splice(3,t.length-1),t.push(["其他",n])}c3.generate({bindto:"#chart2",data:{type:"pie",columns:t},color:{pattern:["#301E5F","#5434A7","#DACBFF","#9D7FEA"]}})}h.addEventListener("click",function(a){a.preventDefault();const r=a.target.getAttribute("class");let t=a.target.getAttribute("data-status"),n=a.target.getAttribute("data-id");if(r=="delSingleOrder-Btn js-orderDelete"){E(n);return}if(r=="js-orderStatus"){A(t,n);return}});function A(a,r){console.log(a,r);let t;a==!0?t=!1:t=!0,axios.put(`${l}/admin/${i}/orders`,{data:{id:r,paid:t}},{headers:{Authorization:c}}).then(function(n){console.log(n),alert("修改訂單成功"),d()}).catch(function(n){console.log(n),alert(`${n.response.status}錯誤`)})}function E(a){axios.delete(`${l}/admin/${i}/orders/${a}`,{headers:{Authorization:c}}).then(function(r){console.log(r),alert("刪除該筆訂單成功"),d()}).catch(function(r){console.log(r),alert(`${r.response.status}錯誤`)})}function S(){g.addEventListener("click",function(a){axios.delete(`${l}/admin/${i}/orders`,{headers:{Authorization:c}}).then(function(r){alert("刪除全部訂單成功"),d()}).catch(function(r){console.log(r),alert(`${r.response.status}錯誤`)})})}S();
