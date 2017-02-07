# rf
Easy alexa control for 433.72 MHz sockets

## Setup
_rf_ requires having compiled and installed `wiringPi` on the system you are building on (hence it's recommended you install this directly on your Raspberry Pi). You will also need `nodejs` as the system that allows for alexa control of the sockets uses `fauxmojs` (a node package).

```console
# with wiringPi installed
make
```

Then move the contents to the `/opt/rf` directory and create a service for the `agent.js` file so it's always running.

### Configuration
As it stands, the project is **super not customised**. I've left all of the default values I used for my sockets in the scripts so you can see exactly how I've done. [These are the sockets I used](https://www.amazon.co.uk/gp/product/B01FX9U0WA/ref=oh_aui_detailpage_o02_s00?ie=UTF8&psc=1).

- **agent.js**: Long-running agent that becomes a locally discoverable device for Alexa
- **signal.c**: Actually outputs a signal for the sockets with microsecond accuracy
- **scripts/**: Helper scrips I created to control _my_ sockets (and examples of how the signal command is used)

## Binary signal
There are various tutorials on the internet of how to get the binary signal for the sockets you are using. Because of the microsecond accuracy required it can be hard to get the exact values. In my case, I used _Adobe Audition_ and took the resolution of my FM radio recording (made with [this](https://www.amazon.co.uk/gp/product/B00VZ1AWQA/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1) receiver and `gqrx`) at 433.72 MHz down to individual samples.

### Exact methodology for extracting binary values and timings
I took each sample length 5 times and then averaged the output. The dead space is the amount of time in between in actual block of binary being broadcast, the active space is how long each binary digit is presented in. The long gap is the gap in the binary digit after its been active and on a 0 and the short gap is the gap in the binary digit after its been 1.

- Samples of a dead space - 259 263 250 257 259 : 257.6
- Samples of an active space - 34 36 34 34 35 : 34.6
- Samples of a long gap - 21 21 23 25 23 : 22.6
- Samples of a short gap - 6 6 5 6 8 : 6

#### Calculation of duration
Total clip length is 0.775 seconds (775000 microseconds), containing 37220 samples. This means that each sample equates for 20.8221386351 microseconds (775000/37220).

#### Final microsecond calculations
- Dead space - 5363.78 microseconds
- Active space - 720.45 microseconds
- Long gap - 470.58 microseconds
- Short gap - 124.94 microseconds
