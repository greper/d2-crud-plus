const str = "2020-12-15 16:54:23.123 |-INFO  [pool-4-thread-3] com.yonsz.statistic.StatisticLogUtil [317] -| [cmdlog] {123123132}"
const reg = /^\d+-\d+-\d+ \d+:\d+:\d+.\d+ \|-.*-\| \[\w+\] \{.*/
console.log(reg.test(str))
