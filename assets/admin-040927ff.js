import{c as i,b as d,t as l}from"./main-877d79b8.js";let o=[];const h=document.querySelector(".js-orderList"),p=document.querySelector(".discardAllBtn");function $(){c()}$();function c(){axios.get(`${i}/admin/${d}/orders`,{headers:{Authorization:l}}).then(function(r){o=r.data.orders;let n="";o.forEach(t=>{const a=new Date(t.createdAt*1e3),e=`${a.getFullYear()}/${a.getMonth()}/${a.getDate()}`;let s="";t.products.forEach(f=>{s+=`
            <p>${f.title} x${f.quantity}</p>
            `});let u="";t.paid==!0?u="已處理":u="未處理",n+=`
            <tr>
            <td>${t.createdAt}</td>
            <td>
              <p>${t.user.name}</p>
              <p>${t.user.tel}</p>
            </td>
            <td>${t.user.address}</td>
            <td>${t.user.email}</td>
            <td>
              ${s}
            </td>
            <td>${e}</td>
            <td class="orderStatus">
              <a href="#" class="js-orderStatus" data-status="${t.paid}" data-id="${t.id}">${u}</a>
            </td>
            <td>
              <input type="button" class="delSingleOrder-Btn js-orderDelete" value="刪除" data-id="${t.id}">
            </td>
          </tr>
            `}),h.innerHTML=n,g(),y()}).catch(function(r){alert(`${r.response.status}錯誤`)})}function g(){let r={};o.forEach(a=>{a.products.forEach(e=>{r[e.category]==null?r[e.category]=e.price*e.quantity:r[e.category]+=e.price*e.quantity})});let n=Object.keys(r),t=[];n.forEach(a=>{let e=[];e.push(a),e.push(r[a]),t.push(e)}),c3.generate({bindto:"#chart",data:{type:"pie",columns:t},color:{pattern:["#301E5F","#5434A7","#DACBFF","#9D7FEA"]}})}function y(){let r={};o.forEach(a=>{a.products.forEach(e=>{r[e.title]==null?r[e.title]=e.price*e.quantity:r[e.title]+=e.price*e.quantity})});let n=Object.keys(r),t=[];if(n.forEach(a=>{let e=[];e.push(a),e.push(r[a]),t.push(e)}),t.sort(function(a,e){return e[1]-a[1]}),t.length>3){let a=0;t.forEach(function(e,s){s>2&&(a+=t[s][1])}),t.splice(3,t.length-1),t.push(["其他",a])}c3.generate({bindto:"#chart2",data:{type:"pie",columns:t},color:{pattern:["#301E5F","#5434A7","#DACBFF","#9D7FEA"]}})}h.addEventListener("click",function(r){r.preventDefault();const n=r.target.getAttribute("class");let t=r.target.getAttribute("data-status"),a=r.target.getAttribute("data-id");if(n=="delSingleOrder-Btn js-orderDelete"){E(a);return}if(n=="js-orderStatus"){A(t,a);return}});function A(r,n){console.log(r,n);let t;r==!0?t=!1:t=!0,axios.put(`${i}/admin/${d}/orders`,{data:{id:n,paid:t}},{headers:{Authorization:l}}).then(function(a){alert("修改訂單成功"),c()}).catch(function(a){alert(`${a.response.status}錯誤`)})}function E(r){axios.delete(`${i}/admin/${d}/orders/${r}`,{headers:{Authorization:l}}).then(function(n){alert("刪除該筆訂單成功"),c()}).catch(function(n){alert(`${n.response.status}錯誤`)})}function S(){p.addEventListener("click",function(r){axios.delete(`${i}/admin/${d}/orders`,{headers:{Authorization:l}}).then(function(n){alert("刪除全部訂單成功"),c()}).catch(function(n){alert(`${n.response.status}錯誤`)})})}S();
