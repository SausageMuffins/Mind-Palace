---
tags: MOC Research
date: 
type: 
 Overview
 Active
summary: 
---

## Research Papers

#### First Pass
```dataview
TABLE WITHOUT ID 
 link(file.link, title) as "Papers", summary as "Summary"
FROM #Research AND #SmartDrive 
WHERE contains(type, "First-Pass")
SORT date asc
```

#### Second Pass
```dataview
TABLE WITHOUT ID 
 link(file.link, title) as "Papers", summary as "Summary"
FROM #Research AND #SmartDrive 
WHERE contains(type, "Second-Pass")
SORT date asc
```

#### Third Pass
```dataview
TABLE WITHOUT ID 
 link(file.link, title) as "Papers", summary as "Summary"
FROM #Research AND #SmartDrive 
WHERE contains(type, "Third-Pass")
SORT date asc
```

---

#### Related Work
1.  Dasgupta, A., Rahman, D. and Routray, A. 2019. A Smartphone-Based Drowsiness Detection and Warning System for Automotive Drivers. _IEEE Transactions on Intelligent Transportation Systems_. 20, 11 (Nov. 2019), 4045–4054. DOI:[https://doi.org/10.1109/TITS.2018.2879609](https://doi.org/10.1109/TITS.2018.2879609).
2.  Fridman, L., Toyoda, H., Seaman, S., Seppelt, B., Angell, L., Lee, J., Mehler, B. and Reimer, B. 2017. What Can Be Predicted from Six Seconds of Driver Glances? _Proceedings of the 2017 CHI Conference on Human Factors in Computing Systems_ (New York, NY, USA, May 2017), 2805–2813.
3.  He, J. 2013. Fatigue Detection using Smartphones. _Journal of Ergonomics_. 03, (Jan. 2013). DOI:[https://doi.org/10.4172/2165-7556.1000120](https://doi.org/10.4172/2165-7556.1000120).
4.  Lee, B.-G. and Chung, W.-Y. 2012. Driver Alertness Monitoring Using Fusion of Facial Features and Bio-Signals. _IEEE Sensors Journal_. 12, 7 (Jul. 2012), 2416–2422. DOI:[https://doi.org/10.1109/JSEN.2012.2190505](https://doi.org/10.1109/JSEN.2012.2190505).
5.  Manoharan, R. and Chandrakala, S. 2015. Android OpenCV based effective driver fatigue and distraction monitoring system. _2015 International Conference on Computing and Communications Technologies (ICCCT)_ (Feb. 2015), 262–266.
6.  Qiao, Y., Zeng, K., Xu, L. and Yin, X. 2016. A smartphone-based driver fatigue detection using fusion of multiple real-time facial features. _2016 13th IEEE Annual Consumer Communications & Networking Conference (CCNC)_ (Jan. 2016), 230–235.
7.  Zhang, L., Liu, F. and Tang, J. 2015. Real-Time System for Driver Fatigue Detection by RGB-D Camera. _ACM Transactions on Intelligent Systems and Technology_. 6, 2 (Mar. 2015), 22:1-22:17. DOI:[https://doi.org/10.1145/2629482](https://doi.org/10.1145/2629482)

---

## Meetings

```dataview
TABLE WITHOUT ID
 link(file.link, title) as "Meetings", summary as "Summary", date as "Date"
FROM #SmartDrive 
WHERE contains(type, "Meeting")
SORT date asc
```
## Important Concepts
- [[Reading Research Papers]]