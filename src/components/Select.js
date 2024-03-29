import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    background-image: url("data:image/svg+xml;utf8,<svg width='14' height='11' viewBox='0 0 14 11' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.37823 9.75281C6.1765 10.8589 7.8235 10.8589 8.62177 9.75281L13.3722 3.17041C14.3268 1.84768 13.3817 0 11.7504 0H2.24956C0.618348 0 -0.326804 1.84768 0.627793 3.17041L5.37823 9.75281Z' fill='black' fill-opacity='0.8'/></svg>");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    display: block;
    height: 16px;
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    z-index: 1;
    pointer-events: none;
  }
`;

const SelectEl = styled.select`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.8);
  width: 200px;
  height: 200px;
  font-size: 1rem;
  text-align: center;
`;

const Select = (props) => {
  return (
    <Wrapper>
      <SelectEl size={"151"} {...props} />
    </Wrapper>
  );
};

export default Select;
