import React, {useState,useEffect} from 'react'
import Head from 'next/head'


// import Nav from '../components/nav'

// #################### ips
// sh = '47.103.125.131'       # 上海
// bj = '39.107.51.202'        # 北京
// hz = '47.111.150.7'         # 杭州
// sz1 = '120.79.138.148'      # 深圳
// sz2 = '39.108.89.127'       # 深圳
// hhht = '39.99.33.53'        # 呼和浩特
// cd0 = '47.108.30.230'        # 成都
// qd = '47.104.232.240'       # 青岛

// xg = '18.162.52.248'        # 香港

// jlp = '47.245.54.39'        # 吉隆坡
// se = '13.209.18.22'         # 首尔
// mm0 = '161.117.13.106'      # 孟买

// ld = '35.177.91.95'         # 伦敦
// bl = '35.180.31.14'         # 巴黎
// flkf = '35.158.197.217'     # 法兰克福

// elg1 = '18.236.83.165'      # 俄勒冈
// elg2 = '54.186.236.135'     # 俄勒冈
// ehe = '18.189.157.194'      # 俄亥俄
// fjny = '47.252.19.123'      # 弗吉尼亚

// sbl = '18.231.116.22'       # 圣保罗

// xn = '13.236.184.221'       # 悉尼

// ## 以上 ip 都有两个选项，即 boot ，peer

// ## 调用方法的输入和输出
// fab get_binary:branch            ## 生成二进制代码   branch是输入参数
// fab -H '47.245.54.39','13.209.18.22' distr_binary:token    ## 分发二进制代码 
// fab -H '47.245.54.39','13.209.18.22' rename_binary:token   ## 重命名二进制代码
// fab -H '47.245.54.39','13.209.18.22' test_chain:token,[peer],['13.209.18.22'],interval,propose,prevote,precommit  ## 启链
// fab -H '47.245.54.39','13.209.18.22' get_chain_logs:token    ## 从远端拉日志
// fab -H '47.245.54.39','13.209.18.22' shutdown_chain	     ## 停链

// fab get_net_binary             ## 生成网络测试二进制代码
// fab -H '47.245.54.39','13.209.18.22' distr_net_binary:token    ## 分发网络测试二进制代码
// fab -H '47.245.54.39','13.209.18.22' rename_net_binary:token   ## 重命名网络测试二进制代码
// fab -H '47.245.54.39','13.209.18.22' test_net:token,[peer],['13.209.18.22'],mode,packet,batch   ## 启动网络测试
// fab -H '47.245.54.39','13.209.18.22' get_net_logs:token    ## 从远端拉日志
// fab -H '47.245.54.39','13.209.18.22' shutdown_net	     ## 停止网络测试



// get_net_binary 勾选


// token,
// branch,
// interval,
// propose,
// prevote,
// precommit
// mode,
// packet,
// batch





const ipList = [
  {
    name: '上海',
    ip: '47.103.125.131',
  },
  {
    name: '北京',
    ip: '39.107.51.202',
  },
  {
    name: '杭州',
    ip: '47.111.150.7',
  },
  {
    name: '深圳1',
    ip: '120.79.138.148',
  },
  {
    name: '深圳2',
    ip: '39.108.89.127',
  },
  {
    name: '呼和浩特',
    ip: '39.99.33.53',
  },
  {
    name: '成都',
    ip: '47.108.30.230',
  },
  {
    name: '青岛',
    ip: '47.104.232.240',
  },
  {
    name: '香港',
    ip: '18.162.52.248',
  },
  {
    name: '吉隆坡',
    ip: '47.245.54.39',
  },
  {
    name: '首尔',
    ip: '13.209.18.22',
  },
  {
    name: '孟买',
    ip: '161.117.13.106',
  },
  {
    name: '伦敦',
    ip: '35.177.91.95',
  },
  {
    name: '巴黎',
    ip: '35.180.31.14',
  },
  {
    name: '法兰克福',
    ip: '35.158.197.217',
  },
  {
    name: '俄勒冈1',
    ip: '18.236.83.165',
  },
  {
    name: '俄勒冈2',
    ip: '54.186.236.135',
  },
  {
    name: '俄亥俄',
    ip: '18.189.157.194',
  },
  {
    name: '弗吉尼亚',
    ip: '47.252.19.123',
  },
  {
    name: '圣保罗',
    ip: '18.231.116.22',
  },
  {
    name: '悉尼',
    ip: '13.236.184.221',
  },
]

const methods = [
  {
    name: 'get_binary',
    params: ['branch'],
    defaultValues: ['local'],
  },
  {
    name: 'distr_binary',
    params: ['token'],
    defaultValues: ['0000'],
  },
  {
    name: 'rename_binary',
    params: ['token'],
    defaultValues: ['0000'],
  },
  {
    name: 'test_chain',
    params: ['token','peers','boots','interval','propose','prevote','precommit','log_level'],
    defaultValues: ['0000','[]','[]','3000','10','10','10',''],

  },
  {
    name: 'get_chain_logs',
    params: ['token'],
    defaultValues: ['0000'],

  },
  {
    name: 'shutdown_chain',
    params: [],
  },
  {
    name: 'distr_net_binary',
    params: ['token'],
    defaultValues: ['0000'],

  },
  {
    name: 'rename_net_binary',
    params: ['token'],
    defaultValues: ['0000'],

  },
  {
    name: 'test_net',
    params: ['token','peers','boots','mode','packet','batch','log_level'],
    defaultValues: ['0000','[]','[]','tentacle','400','20',''],

  },
  {
    name: 'get_net_logs',
    params: ['token'],
    defaultValues: ['0000'],

  },
  {
    name: 'shutdown_net',
    params: [],
    defaultValues: [],

  },
]

// const otherParams = [
//   'token',
//   'branch',
//   'interval',
//   'propose',
//   'prevote',
//   'precommit',
//   'mode',
//   'packet',
//   'batch'
// ]

const Home = () => {
  const [input,setInput]=useState('')
  const [output,setOutput]=useState('')
  const [mask,setMask] = useState(false)
  useEffect(() => {
    const element = document.querySelector('#test_net')
    if(element){
      element.checked = true
    }
  },[])
  const send=()=>{
    let command = {}
    const peerIpElements = document.querySelectorAll('.peerIp:checked')
    const peerIpsValue = []
    if(peerIpElements.length>0){
      for(var i=0;i<peerIpElements.length;i++) {
        const element = peerIpElements[i]
        peerIpsValue.push(element.value)
      }
    }
    if(peerIpsValue.length> 0) {
      command["peers"] = peerIpsValue
    }

    const bootIpElements = document.querySelectorAll('.bootIp:checked')
    const bootIpsValue = []
    if(bootIpElements.length>0){
      for(var i=0;i<bootIpElements.length;i++) {
        const element = bootIpElements[i]
        bootIpsValue.push(element.value)
      }
    }
    if(bootIpsValue.length> 0) {
      command["boots"] = bootIpsValue
    }

    const methodElement = document.querySelector('input[name="methodName"]:checked')
    if(methodElement){
      command['method'] = methodElement.value
    } else {
      alert('method name not empty')
      return
    }

    const paramsElement = document.querySelectorAll('input[name="methodName"]:checked+div+div .otherParams')
    const paramsNotEmptyValue = []
    for(var i=0;i<paramsElement.length;i++) {
      const element = paramsElement[i]
      if(element.value){
        paramsNotEmptyValue.push({
          name: element.id,
          value: element.value
        })
      }
    }



    paramsNotEmptyValue.forEach((d,i)=>{
      if(d.name=='peers') {
      } else if(d.name=='boots') {
        command['boots'] = bootIpsValue
      } else {
        command[d.name] = d.value
      }
    })

    setInput(JSON.stringify(command))
    setMask(true)
    setOutput("")
    fetch('/command',{
      method: "post",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      // headers: { 'Content-Type': 'application/octet-stream' },
      // mode: "cors",
      body: JSON.stringify({command})
    })
    .then(function(res) { 
      var reader = res.body.getReader();  
      reader.read().then(function processResult(result) {
        // Result objects contain two properties:
        // done  - true if the stream has already given you all its data.
        // value - some data. Always undefined when done is true.
        if (result.done) {
          console.log("Fetch complete");
          setMask(false)
          return;
        } else {
          // do something with each chunk  
          const Uint8ArrayToString=(fileData)=>{
            var dataString = "";
            for (var i = 0; i < fileData.length; i++) {
              dataString += String.fromCharCode(fileData[i]);
            }
           
            return dataString
          }
        
          setOutput(output+Uint8ArrayToString(result.value))
          // Read some more, and call this function again
          return reader.read().then(processResult);
        }
    
       
      })
    }) 
    .catch(function(err) { 
      setMask(false)
      console.log('Fetch Error : %S', err); 
      setOutput(err.message)
    })
  }

  const selectAll = (e,className)=>{
    // console.log(e.target)
    const checked = e.target.checked
    const peerIpElements = document.querySelectorAll(className)
    if(peerIpElements.length>0){
      for(var i=0;i<peerIpElements.length;i++) {
        const element = peerIpElements[i]
        element.checked = checked
      }
    }
  }
  
  return (
    <div>
      <Head>
        <title>muta op tool</title>
      </Head>
      <div className='app'>
        <h1 className='title'>muta op tool</h1>
        <fieldset>
          <legend className="label">peers<span><input type='checkbox' onChange={(e)=>{selectAll(e,'.peerIp')}}/>全选</span></legend>
          <div>
            {
              ipList.map((d)=>{
                return (
                  <>
                    <input className="peerIp" type="checkbox" value={d.ip} /><span>{`${d.name}(${d.ip})`}</span>
                  </>
                )
              })
            }
          </div>
        </fieldset>
        <fieldset>
          <legend className="label">boots<span><input type='checkbox' onChange={(e)=>{selectAll(e,'.bootIp')}}/>全选</span></legend>
          <div>
            {
              ipList.map((d)=>{
                return (
                  <>
                    <input className="bootIp" type="checkbox" value={d.ip} /><span>{`${d.name}(${d.ip})`}</span>
                  </>
                )
              })
            }
          </div>
        </fieldset>
       
        <div className="row">
            <div style={{flex:1}}>
              <fieldset>
                <legend className="label">method</legend>
                <div>
                  <div>
                    {
                      methods.map((d)=>{
                        return (
                          <div className='column'>
                            <div className='row method'>
                              <input type='radio' name='methodName' value={d.name} id={d.name} /> 
                              <div>{d.name}</div>
                              <div className='column'>
                                {
                                  d.params.map((subD,i)=>{
                                    if(subD==='boot'||subD==='peer'){
                                      return (
                                        <div>
                                          <input type='text' disabled className='otherParams' placeholder={subD} id={subD} defaultValue={d.defaultValues[i]} />
                                          <span>{subD}</span>
                                        </div>
                                      )
                                    }else {
                                      return (
                                        <div>
                                          <input type='text' className='otherParams' placeholder={subD} id={subD} defaultValue={d.defaultValues[i]} />
                                          <span>{subD}</span>
                                        </div>
                                      )
                                    }
                                    
                                  })
                                }
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="column inputOutput" style={{flex:1}}>
              <fieldset style={{ minHeight: 100}}>
                <legend>input</legend>
                <div>
                  <div><button onClick={send} style={{ width: 100, height: 30,}}>send</button></div>
                  <div style={{ wordBreak: 'break-all'}}>{input}</div>
                </div>
              </fieldset>
              <fieldset style={{ flex: 1}}>
                <legend>output</legend>
                <div  style={{ wordBreak: 'break-all'}}>
                  {output}
                </div>
              </fieldset>
            </div>
        </div>
        
        
        {mask?<div className="mask"></div>:null}
      </div>
  
      <style jsx>{`
        :global(*) {
          // margin: 0;
          // padding: 0;
        }
        .app {
          width: 100%;
          height: 100vh;
        }
        .mask{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          top: 0;
          left: 0;
          position: fixed;
          z-index: 999;
        }
        .title {
          margin: 0;
          width: 100%;
          text-align: center;
          // line-height: 1.15;
          // font-size: 48px;
        }
        .label {
          font-weight: bold;
        }
        .vhCenter {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 10px;
        }
        .row {
          display: flex;
        }
        .column {
          display: flex;
          flex-direction: column;
        }
        .method {
          margin-top:5px;
        }
        .method >div:nth-child(3) {
          flex: 1
          margin-top: 10px;
          margin-left: 10px;
        }
        // .method > input {
        //   flex: 1;
        // }
        .otherParams+span{
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

export default Home
