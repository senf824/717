import React,{ Component } from 'react'
import {
  UPDATE_GOODS_COUNT,
  UPDATE_GOODS_SELECTED
} from "../../../store/reducers";
import { connect } from 'react-redux'

class CartItem extends Component {
  constructor() {
    super();
  }
  render() {
    const { item, changeCount, toggleSelect } = this.props;
    return (
      <div className="item">
        <span
          onClick={() => {
            toggleSelect(1-item.selected,item.goods_id)
          }}
          className={
            item.selected === 0 ? "item-inp" : "item-inp item-inp-active"
          }
        />
        <dl>
          <dt>
            <img src={"http://www.lb717.com/" + item.obj_data} alt="" />
          </dt>
          <dd>
            <p>{item.goods_name}</p>
            <div>
              <span>x{item.count}</span>
              <p>￥{item.discount_price * item.count}</p>
            </div>
            <div className="as-btn">
              <small
                onClick={() => {
                  changeCount(--item.count, item.goods_id);
                }}
              >
                -
              </small>
              <span>{item.count}</span>
              <small
                onClick={() => {
                  changeCount(++item.count, item.goods_id);
                }}
              >
                +
              </small>
            </div>
          </dd>
        </dl>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCount(count,id){
      dispatch({
        type: UPDATE_GOODS_COUNT,
        data:count>0?count:1,
        id
      })
    },
    toggleSelect(selected, id) {
      dispatch({
        type: UPDATE_GOODS_SELECTED,
        data: selected,
        id
      })
    }
  }
}
export default connect(null, mapDispatchToProps,null,{pure:false})(CartItem)