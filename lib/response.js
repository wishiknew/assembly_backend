/**
 * Response class
 * @return {Object} attendance
 */

class Response {
  constructor(data) {
    this.data = data;
    this.attendance = {};
  }

  findHighest() {
    let data = this.data;
    // now sort w.r.t visitors count desc. and get the first element
    const [museum, visitors] = Object.entries(data).sort(
      (a, b) => b[1] - a[1]
    )[0];
    return {
      museum,
      visitors: Number(visitors),
    };
  }
  findLowest() {
    // sort by visitors
    let data = this.data;
    data = Object.entries(data).sort((a, b) => a[1] - b[1]);
    // filter the museums that have the visitors count and pick the first entry
    const [museum, visitors] = data.filter((el) => {
      if (el[1].length > 0) return true;
    })[0];
    return {
      museum,
      visitors: Number(visitors),
    };
  }

  getMonth() {
    let dateString = this.data.Month;
    let date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    return month;
  }
  getYear() {
    let dateString = this.data.Month;
    let date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  }

  getTotal() {
    console.log(this.data);
    return Object.values(this.data).reduce((acc, curr) => {
      if (curr.length) {
        //   console.log(curr);
        curr = Number(curr);
        return acc + curr;
      } else {
        return acc;
      }
    }, 0);
  }
  getIgnored(ignored) {
    if (this.data[ignored]) {
      return {
        museum: ignored,
        visitors: this.data[ignored],
      };
    }
  }

  createResponse(ignored = "") {
    let obj = {};
   
    obj.month = this.getMonth();
    obj.year = this.getYear();
    // delete the Month field as we have already set month and year
    delete this.data.Month;
    obj.ignored = this.getIgnored(ignored);

    // delete the ignored museum
    delete this.data[ignored];

    // delete the ignored museum from data

    obj.highest = this.findHighest();
    obj.lowest = this.findLowest();

    obj.total = this.getTotal();

    this.attendance = obj;
    delete this.data;
  }
}

module.exports = Response;
