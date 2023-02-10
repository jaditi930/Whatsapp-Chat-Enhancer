    function choosefile()
    {
        document.getElementById("file_input").click()
    } 
    async function update_message()
    {
    const about_msg="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit libero quaerat numquam\
     maiores pariatur dicta molestiae at voluptatem voluptas dolorem ea saepe reiciendis sunt, eligendi \
     tempora maxime delectus, quos nihil eos eum asperiores placeat."
     for(let i=0;i<about_msg.length;i++)
    {
        document.getElementById("about").innerHTML+=about_msg[i];
        if(i%3==0)
        await sleep(100);
    }
}
    function print_message(latest_message,latest_sender,latest_time)
    {
        // console.log(other)
        if(latest_sender==other)
       {
        var msg=`
                <div class="message">
                    <div class="sender">${latest_sender}</div>
                    <div class="content">${latest_message}
                        <span class="timestamp">${latest_time}</span>
                    </div>
                </div>`;
       }
        else
        {
            var msg=`
                <div class="message" style="background-color:#4ca54c;align-self:flex-end;">
                    <div class="sender">${latest_sender}</div>
                    <div class="content">${latest_message}
                        <span class="timestamp">${latest_time}</span>
                    </div>
                </div>`;
        }
            document.getElementById("messages").innerHTML+=msg;
    }
    let other=""
    $(".bg").css("display","block")
       function previewFile(){
        $(".chooseFile").css("display","none")
        // $("#particles-js").css("display","none")
        const [file] = document.querySelector('input[type=file]').files;
        other=file.name
        console.log(other)

        let id=other.indexOf("with")
        let ip=other.indexOf(".txt")
        console.log(id,ip)
        other=other.slice(id+4,ip)
        // console.log(other)
        if (file) {

  const reader = new FileReader();
  reader.addEventListener("load", async () => {
    $(".bg").css("display","block")
    $("input").css("display","none")

    let msg_data=reader.result;
    let result=msg_data.split(/\r?\n/)
    result.splice(0,1);
    // console.log(result)
    var latest_message="",latest_sender="",latest_time="",last_date="",current_date="";
     for(var i=0;i<result.length;i++){
        // console.log(result[i])
        if(result[i][2]!="/")
        {   
            if(result[i]=="")
             continue;
            print_message(result[i],latest_sender,latest_time);
            continue;
        }
        let content=result[i].split(":")
        let b=content[0]+":"+content[1]
        let c=b.split(",")
        let d=b.split("-")
        let time=c[1].split("-")
        let e=content[0].split(",")
        last_date=current_date
        current_date=e[0]
        // console.log(current_date)
        if(current_date!=last_date)
        {
          const date=`<div class="toast">
         <span class="date-box">${current_date}</span>
            </div>`
            document.getElementById("messages").innerHTML+=date;
        }
        latest_time=time[0]
        latest_sender=d[1]
        latest_message=content[2]
        i++;
        while(i<result.length && result[i][2]!="/")
        {   
            // console.log("hi")
            if(result[i]=="")
             continue;
            latest_message+="<br>"+result[i];
            i++;
        }
        i--;
        // console.log(i)
        // console.log(latest_message)
        print_message(latest_message,latest_sender,latest_time);
        // setTimeout(function(){

        // },10);
        await sleep(100);
     }
  }, false);

    reader.readAsText(file);  }
       }
       function sleep(ms) {
return new Promise(
resolve => setTimeout(resolve, ms)
);
}
