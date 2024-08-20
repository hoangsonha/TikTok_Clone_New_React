import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './Account';
import { useEffect, useRef, useState } from 'react';
import { apiAllUser, getApiAccountByPage } from '~/serviceApi/getAll';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPage, setTotalPage] = useState();

    const [pageSize, setPageSize] = useState(5);

    const [seeLess, setSeeLess] = useState(false);

    const prevUsers = useRef([]);

    useEffect(() => {
        const apiUser = async () => {
            const result = await getApiAccountByPage(page, pageSize);
            if (result && result.code === 'Success') {
                setTotalPage(result.totalPage);
                setUsers(result.data);
            }
        };
        apiUser();
    }, []);

    const handleSeeMore = () => {
        setPage((prev) => prev + 1);
        prevUsers.current = [
            ...prevUsers.current,
            {
                page: page,
                users: users,
            },
        ];
        const apiUser = async () => {
            const result = await getApiAccountByPage(page + 1, pageSize);
            if (result && result.code === 'Success') {
                setUsers((prev) => [...prev, ...result.data]);
            }
            if (page + 1 === totalPage) {
                setSeeLess(true);
            }
        };
        apiUser();
    };

    const handleSeeLess = () => {
        // Nó sẽ đợi cho đến khi kết thúc hàm đang chạy và sau đó xử lý việc re-render.
        setPage((prev) => prev - 1);

        const user = prevUsers.current[prevUsers.current.length - 1];

        prevUsers.current = prevUsers.current.slice(0, prevUsers.current.length - 1);

        if (prevUsers.current.length === 0) {
            setSeeLess(false);
        }

        console.log('user ne', user);
        setUsers(user.users);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {users &&
                users.map((user) => {
                    return <AccountItem key={user.id} data={user} />;
                })}
            {!seeLess ? (
                <p className={cx('more-btn')} onClick={handleSeeMore}>
                    See more
                </p>
            ) : (
                <p className={cx('more-btn')} onClick={handleSeeLess}>
                    See less
                </p>
            )}
        </div>
    );
}

export default SuggestedAccounts;

// import React, { useState, useEffect } from 'react';

// const PaginationComponent = () => {
//   const [items, setItems] = useState([]); // Dữ liệu từ API
//   const [visibleItems, setVisibleItems] = useState([]); // Phần tử hiển thị
//   const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//   const itemsPerPage = 5; // Số phần tử mỗi trang

//   useEffect(() => {
//     fetchItems(); // Gọi API để lấy dữ liệu
//   }, []);

//   const fetchItems = async () => {
//     const response = await fetch(`https://api.example.com/data?page=${currentPage}`);
//     const data = await response.json();
//     setItems(prevItems => [...prevItems, ...data]); // Cập nhật dữ liệu vào items
//     setVisibleItems(prevVisible => [...prevVisible, ...data]); // Hiển thị dữ liệu
//   };

//   const showMore = () => {
//     if (items.length < currentPage * itemsPerPage) {
//       fetchItems();
//     }
//     setCurrentPage(currentPage + 1);
//   };

//   const showLess = () => {
//     if (currentPage > 1) {
//       const newPage = currentPage - 1;
//       setCurrentPage(newPage);
//       setVisibleItems(items.slice(0, newPage * itemsPerPage)); // Bỏ bớt phần tử
//     }
//   };

//   return (
//     <div>
//       {visibleItems.map((item, index) => (
//         <div key={index}>{item.name}</div>
//       ))}

//       {currentPage * itemsPerPage < items.length && (
//         <button onClick={showMore}>Show More</button>
//       )}

//       {currentPage > 1 && (
//         <button onClick={showLess}>Show Less</button>
//       )}
//     </div>
//   );
// };

// export default PaginationComponent;
