import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, message } from 'antd';
import { Col, Divider, Row, Spin } from 'antd';
import { createApi } from "unsplash-js";
import {saveAs} from "file-saver";

const { Search } = Input;

const style = {
    background: '#0092ff',
    padding: '8px 0',
};

function Snap() {
    const unsplash = createApi({ accessKey: 'Siy7qB0bKhUkWUaV76JUUWRCfmuB7HjqRqyeqFE796k' });


    const [imageSearch, setImageSearch] = React.useState('')
    const [active, setActive] = React.useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [imageList, setImageList] = React.useState([])
    const [loader, setLoader] = React.useState(false);

    const onSearch = (value) => {
        if (value.length > 0) {
            setActive(false)
            console.log(value)
            setImageSearch(value)
        } else {
            setActive(true)
            messageApi.open({
                type: 'error',
                content: 'enter valid Input*',
            });
        }
    };
    React.useEffect(() => {
        setLoader(true)

        unsplash.search.getPhotos({
            query: imageSearch || "gym",
            page:"2",
            perPage:"20"
        }).then(result => {
            console.log(result.response.results)
            setImageList(result?.response?.results)

            setLoader(false)
        })

    }, [imageSearch])
    
    if (loader) {
        return (<div class="loader_parent" id="loader_parent">
            <Spin tip="" size="large">
                <div class="loader" id="loader" />
            </Spin>

        </div>)
    }


    const handleClick = (imageUrl)=>{
        let url = imageUrl
        saveAs(url, "image");
       }

    return (
        
              <div id="page-snap">
                <div>
                    {contextHolder}
                    <h1>🆂🅽🅰🅿🆂🅷🅾🆃
                    </h1>
                    <Space direction="vertical">
                        <Search className='in' status={!active ? "success" : "error"} placeholder="input search text" onSearch={onSearch} enterButton />
                    </Space>
                </div>
                <div >
                    <Divider >{imageSearch} Image</Divider>
                    <div  style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                        {
                            imageList?.map((val, id) => (
                                <div className='container'>
                                <img className='img-list' src={val?.urls?.regular} alt='image not load' style={{ marginTop: "20px", objectFit: "cover" }} width={300} height={250} />
                                <div class="button" onClick={()=>handleClick(val?.urls?.regular)}><a href="#"> Download </a></div>
                                </div>
                                ))
                        }
                    </div>

                </div>
            </div>
        
    )
}
export default Snap