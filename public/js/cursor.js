        
        var socket = io(); 
        var xPos = 0;

        // socket.emit('new user');
        
        const testDiv = document.querySelector('.test');
        const cursor = document.querySelector('.cursor');
        const usersDiv = document.querySelector('.users');

        socket.on('connect', () => {
          // console.log(socket.id);
        })

        socket.on('render portraits', (userArr) => {
          let usersOnline = userArr.length;

          document.querySelector('.my-id').innerHTML = socket.id;

          usersDiv.innerHTML = "";
          
          for(let i=0; i<usersOnline; i++) {
            let element = document.createElement("div");
            element.classList.add('user-portrait');
            element.id = i;

            element.style.backgroundColor = userArr[i].color;

            if(userArr[i].userID === socket.id){
              element.classList.add('active-portrait');
            }
            usersDiv.append(element);

            console.log(document.querySelector('.cursors').innerHTML);
            // document.querySelector('.cursors').innerHTML = "";
            
            // init cursors
            element = document.createElement("div");
            element.classList.add('cursor');
            element.id = `${i}-cursor`;
            element.style.backgroundColor = userArr[i].color;
            element.style.left = userArr[i].xPos + 'px';
            element.style.top = userArr[i].yPos + 'px';
            document.querySelector('.cursors').append(element);
            
          }

        });

        const cursorfps = 120;
        let wait = false;

        testDiv.addEventListener('mousemove', (e) => {
          if(!wait) {
            socket.emit('mouse move', e.clientX, e.clientY);
            wait = true;

            setTimeout(() => {
              wait = false;
            }, 1000 / cursorfps);
          }

        });

        socket.on('render cursors', userArr => {
          console.log("rendering cursors!");
          for(let i=0; i<userArr.length; i++) {
            const cursor = document.getElementById(`${i}-cursor`);
            cursor.style.left = userArr[i].xPos + 'px';
            cursor.style.top = userArr[i].yPos + 'px';
          }
        });