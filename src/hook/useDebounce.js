import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debounceValue;
}

export default useDebounce;

// useDebounce : một chuôi hành động nhưng chỉ thực hiện cái cuối cùng thôi, tránh việc trong 1 chuỗi có lúc nhanh chậm mà
//		res đầu tiên lại xong trước res cuối cùng

// 1. lần đầu chạy thìdebounce trong component Search là 1 chuỗi rỗng,
//    nên hàm useDebounce sẽ set value và trả về rỗng sau đó chạy vào
//    vào useEffect và kiểm tra trim() thì return;

// 2. lần 2: chữ 'h' , initState sẽ chỉ lấy lần đầu tiên nên khi chữ h đc truyền
//    qua thì sau đó value truyền vào thay đổi (từ rỗng thành chữ 'h') nên
//    sẽ lọt vào dependance của useEffect nên sẽ lọt vào sử lí bên trong,
//    do setTimeout nên sau 1 khoảng thời gian mới set lại cái useState bằng cái value,
//    (value lúc này là 'h') nên phải mất 500 mili giây sau mới trở thành chữ 'h' nên return vẫn là chuỗi rỗng
//    nếu k làm gì thì sau 500 mili s sau cái đoạn set useState mới đc chạy thì mới set thành chữ 'h' và return ra 'h'
//    do gõ liên tục lên lúc này chuỗi return vẫn là rỗng nên useEffect ở component Search vẫn chưa gọi API

// 3. lần 3: chữ 'ho' vẫn vậy

// 4. lần 4: chữ 'hoa', k ăn vào initState nên vẫn là chuỗi rỗng, do mình ngừng gõ r nên 500 mili s sau
//    nó set lại debounceValue = value truyền vào và nó re-render component và nó trả ra cái value là 'hoa',
//    sau khi set thì useEffect bên Search sẽ thay đổi dependance từ chuỗi rỗng sang hoa nên nó sẽ gọi API 1 lần
// khi set lại state trong 5 giây thì nó vẫn return ra rỗng, nhưng sau 5 s thì state thay đổi nên re-render lại và return lại ra value đc set state

// cleanup function thì mỗi khi value đc truyền vào trong dependance thay đổi thì sẽ trừ lần chạy đầu tiên thì nó sẽ gọi hàm cleanup
// trước khi chạy vào useEffect, nên sẽ huỷ đi cái việc setTimeout trước đó nên sẽ k có set lại
// state sau khi 500 mili s
