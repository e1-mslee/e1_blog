import React, { useRef, useState, useEffect }from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CateAdmin = () => {
    const [supiCate, setSupiCate] = useState('');
    const [supiOptions, setSupiOptions] = useState([]);
    const [cateName, setCateName] = useState('');
    const [cateList, setCateList] = useState([]);

    const getCodeData = async() => {
        let res = await fetch("/api/supiCategoryList", {
            method : "POST",
            headers: {
                'Content-Type' : 'application/json',
            },

        })

        let data = await res.json();
        setSupiOptions(data);

        await getCodeList();
    }

    const getCodeList = async() => {
        let res = await fetch("/api/categoryDetailList", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
        })

        let data = await res.json();
        setCateList(data);
    }

    useEffect(() => {
        getCodeData();
    }, [])

    const updateCate = async() => { 
        
    };

    const categoryChanged = (e) => {
        let value = e.target.value;
        setSupiCate(value);
    }

    const nameChange = (e) => {
        let value = e.target.value;
        setCateName(value);
    }
    return (
        <div className='row'>
            <h2>카테고리 관리</h2>
            <hr/>
            <h4>카테고리 정보</h4>
            <Row>
                <Col md={2}>
                    <Form.Select>
                        <option value={supiCate} onChange={categoryChanged}>선택</option>
                        {supiOptions.map((option, i) => (
                            <option value={option.ca_id}>{option.ca_nm}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={6}>
                    <Form.Control type="text" className='mb-2' id="caNm" placeholder="카테고리명을 입력하세요." value={cateName} onChange={nameChange}/>
                </Col>
                <Col md={1}>
                    <button type='button' className="button primary" onClick="updateCate">등록</button>
                </Col>
            </Row>
            <hr/>
            <table id='postList'>
                <tbody>
                    <tr>
                        <td className='TdBorder'>ID</td>
                        <td className='TdBorder'>상위 카테고리</td>
                        <td className='TdBorder'>카테고리</td>
                        <td className='TdBorder'></td>
                        <td className='TdBorder'></td>
                    </tr>
                    {cateList.map((cate) => (
                        <tr key={cate.id}>
                        <td className='TdBorder'>{cate.ca_id}</td>
                        <td className='TdBorder'>{cate.supi_nm}</td>
                        <td className='TdBorder'><Form.Control type="text" className='form-control-sm' value={cate.ca_nm}/></td>
                        <td className='TdBorder'><button type="button" className='button small primary'>수정</button></td>
                        <td className='TdBorder'><button type="button" className='button small primary'>삭제</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CateAdmin