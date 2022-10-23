export const createOrder = async({name,phoneno,address,total,PaymentMethod})=>{
    const res = await fetch('/api/order',{
        method: "POST",
        body: JSON.stringify({
            name:       name,
            phoneno:    phoneno,
            address,    address,
            total:      parseFloat(total),
            method:    PaymentMethod,
            status:     1
        })
    });
    const id = await res.json();
    return id;
}