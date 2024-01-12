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

    const insertCate = async() => { 
        if(cateName === null || cateName === ''){
            alert("카테고리명을 입력하세요.");
            return;
        }

        if(supiCate === null || supiCate === ''){
            alert("상위카테고리를 선택하세요.");
            return;
        }
        
        let param = {
            ca_nm : cateName,
            supi_id : supiCate
        } 

        await fetch("/api/categoryInsert", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(param)
        })

        getCodeData();
    };

    const categoryChanged = (e) => {
        let value = e.target.value;
        setSupiCate(value);
    }

    const nameChange = (e) => {
        let value = e.target.value;
        setCateName(value);
    }
    
    const listNameChange = (cate) => {
        const updatedList = cateList.map((category) =>
        category.ca_id === cate.ca_id ? cate : category );

        setCateList(updatedList);
    }

    const updateHandler = async(cate) => {
        await fetch("/api/categoryUpdate", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(cate)
        })

        await getCodeList();
    }

    const deleteHandler = async(cate) => {
        // validation
        let nodeCntData = await fetch("/api/nodeCnt", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(cate)
        })
        let nodeCnt = await nodeCntData.json();
        nodeCnt = nodeCnt[0]['cnt'];

        if(nodeCnt !== "0") {
            alert("하위 카테고리가 있습니다.");
            return;
        }

        let postCntData = await fetch("/api/postCnt", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(cate)
        })
        let postCnt = await postCntData.json();
        postCnt = postCnt[0]['cnt'];

        if(postCnt !== "0") {
            alert("작성글이 있습니다.");
            return;
        }

        await fetch("/api/categoryDelete", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(cate)
        })

        await getCodeList();
    }


    return (
        <div className='row'>
            <h2>카테고리 관리</h2>
            <hr/>
            <h4>카테고리 추가</h4>
            <Row>
                <Col md={2}>
                    <Form.Select onChange={categoryChanged}>
                        <option value="">선택</option>
                        {supiOptions.map((option, i) => (
                            <option key={i} value={option.ca_id}>{option.ca_nm}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={6}>
                    <Form.Control type="text" className='mb-2' id="caNm" placeholder="카테고리명을 입력하세요." value={cateName} onChange={nameChange}/>
                </Col>
                <Col md={1}>
                    <button type='button' className="button primary" onClick={insertCate}>등록</button>
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
                            <td className='TdBorder'>
                                {cate.ca_id !== 1 && ( <Form.Select className="form-select-sm" value={cate.supi_id} onChange={(e) => {listNameChange({...cate, supi_id: e.target.value})}}>
                                {supiOptions.map((option, i) => (
                                    <option key={i} value={option.ca_id}>{option.ca_nm}</option>
                                ))}
                                </Form.Select> )}</td>
                            <td className='TdBorder'><Form.Control type="text" className='form-control-sm' value={cate.ca_nm} onChange={(e) => {listNameChange({ ...cate, ca_nm: e.target.value})}}/></td>
                            {cate.ca_id !== 1 &&(
                                <>
                                    <td className='TdBorder'><button type="button" className='button small primary' onClick={() => updateHandler(cate)}>수정</button></td>
                                    <td className='TdBorder'><button type="button" className='button small primary' onClick={() => deleteHandler(cate)}>삭제</button></td>
                                </>
                            )}
                            {cate.ca_id === 1 &&(
                                <>
                                    <td className='TdBorder'></td>
                                    <td className='TdBorder'></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CateAdmin