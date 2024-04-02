import React, { SetStateAction, useEffect, useState } from "react";
import Product from "../models/Product";

const defaultImg: string =
  "data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCADIAMgBAREA/8QAHQABAAICAwEBAAAAAAAAAAAAAAcJBggBBAUDAv/EAEwQAAEDAwMCAgYFBggNBQAAAAECAwQABQYHERIIEyExCRQiQVFhFUJSgaEWFzJicZEjJDM3Q3axwRgZOGdyc5KmsrO00eQ1V3eV0//aAAgBAQAAPwCqqlKUpSlKkbDenLXLPu0vGNML46xIiJnMSpTHqUZ5hXHipt+QUNr5BaSAlRJG5AIBIlWyejz17utrZnz5mKWZ93lzgzri6t9rZRA5Fhpxs7gBQ4rPgob7HcDObJ6NG9yLWy7kmrkCDcVcu9Hg2hcthHtHjxdW60pW6eJO7adiSPHbc97/ABZf+ez/AHb/APKro3v0aN7j2t53G9XIE64p49mPOtC4jC/aHLk6h11Sdk8iNm1bkAeG+4wa9+jz17tVrenwJmKXl9rjwgwbi6h93dQB4l9ptsbAlR5LHgk7bnYGKsy6ctcsB7q8n0wvjTEeIqc/KiseuxmWE8uSnH45W2jiEKJClAgbEgAgmOaUpSlKUpSlKUr3MNwbL9Q741jeE45OvNxd4nsxWivtoK0o7jiv0W2wpaQXFkJTyG5FbgaUejjfnQ03HWPKpEN6Q0C3arEpCnWVKCCO7IcQpBUklxCm0IUncJUl0jwrebSTotxnHhAlYRpNY7CYPcMa6TIwMxAc5cyJDgVIVuFqT4qPsniPZ2FbA2XputDIS5f77Ikq97cZAbT+87k/hWZ27SDTu2gdvG2H1D60hSnSf9o7fhXvR8WxmIAmNj1taA+zFQP7q7P0RattvoyJt/qU/wDautIxbGZYKZOPW10H7UVB/urwbjo/p3cge5jbLCj9aOpTRH+ydvwrDL103Wh4KcsF9kRle5uSgOJ/eNiPxrX7VvotxnIRPlZvpNY78Z3bMm6Q4oExYb48CZDYTITsEJT4KHsjifZ3FaM6r+jjfgw1XHRzKpEx6O0S5ar6pCXXlJCye1IbQlAUohtCW1oSncqUp0DwrT/MsGy/Ty+O43m2OTrNcWuR7Mpoo7iAtSO42r9FxsqQoBxBKVcTsTXh0pSlKUpSlbVaA9CWX592ck1X9exWwK76BA4Fm7PLTslKu262UstlRUd1gqIb8EcVpcFnWifTPEt9jj2jDMag4rjjfFXJtjgX1BCUdw/WecKUJBcWSVcRuomtl8R0wxHDkJXAt6X5YHjKkALc3+XuT91ZbSlKUpSlYll2mGI5ihS59vSxLI8JUcBDm/z9yvvrWjWzpniXCxyLRmeNQcqxxzkrk4xzLCihSO4PrMuBK1AOIIKeR2UDVYuv3Qll+A97JNKPXsqsCewgwOBeuzK1bpUrttNhLzYUEndACgHPFHFCnDqrSlKUpSvvAgTrpOj2y2Qn5kyY6hiPHYbLjrzqyEpQhKdypRJAAA3JO1WE9KPRC/gd6iZ3qjHiXPJW1NLs9ojHvtQHSkHuOHbZyQlRKUhPJCCnmlS1FCm7NdNNDY1uS1e8yZQ/L8FtQj4ttfAr+0r5eQ+dTElKUJCUJCUgbAAbACuaUpSlKUpSuFJStJStIUkjYgjcEVDupehsa4pdveGsoYl+K3YQ8G3fiUfZV8vI/Kqyuq7ohfzy9S870ujxLZkrinV3i0ST2Gp7oST3Gzts3IUoBKgrihZVzUpCgtTle0+BOtc6RbLnCfhzIbq2JEd9stusuoJSpC0q2KVAgggjcEbV8KUpSlWL9D3S1dMBY/ONntgaGVXhCG7NAdZUZVrYUFBRUCdkPOhSQU8eaEDiVAuONptH0n0njYfGReby0h68vJ38fERkn6qf1vifuHzkqlKUpSlKUpSlKjXVjSeNmEZd5szSGbyynfw8BJSPqq/W+B+4/Krjrh6WrpnzH5xsCsDRyqzoW3eYDTKhKujCQkJKQDst5oJUAnjzWg8QoltttVdFKUpW3HQv04flnfG9Y8zhTmbPYZbT1hR/Jt3Ca2sku8geRbYWhPgBxWs8SohtxCrjdDdNE26M3mV7j/xt9O8JpY/kmz/SEfaPu+A/bUx0pSlKUpSlKUpSlQ5rlpom4xnMzskf+NsJ3mtIH8q2P6QD7Q9/xH7Kpy66OnD8jL45rHhsKc9Z79LdevyNu43b5riwQ7yJKw28tavAjihY2CgHG0J1HpSsq0r09umquodi0+tDnafvMsMre2SrsMJBW89xUpIVwaStfHkCrjsPEirwenbRvHW127F7BZGbdi+ONJ2jMg8NtyQgk+KlLVupSlEqUSpSiSSTt4lKUJCUpASBsAB4AVzSlKUpSlKUpSlKVwpKVpKFpCkqGxBG4IrUPqJ0bx1xdxxe/wBkYuOL5G0reM8Dw23BKAR4pUhWykqSQpJCVJIIBFH2qmnt00q1Dvun13c7r9mlllD2yU99hQC2XuKVKCebSkL48iU8tj4g1itK3/8AR2aQm04zctY7mwfW8gK7XaQFb7Qm3B3l+ysg9x9sJ4qQFJ9W3BKXKt80vxFGH4jEgLbAlvj1iUff3FDy+4bD7qy2lKUpSlKUpSlKUpSsS1QxFGYYjLgIbBlsD1iKfeHEjy+8bj76qD9InpCbtjNt1jtjB9bx8otd2BVtvCccPZX7SwB233CnilBUr1nckJbrQCu9YrJdMmvluxuyRfWbjdZbMGGzzSjuvurCEJ5KISndSgNyQBv4kVeh0zaUWKwysbwSwxOFlxmKg7KQgKcDe3tucEpSXHHDzWoAclKUffW5VKUpSlKUpSlKUpSlKVpr1M6U2K/SskwS/ROdlyaKs7JQgqbDm/tt80qSHG3BzQog8VJSdvCqL79ZLpjN8uON3uL6tcbVLegzGeaV9p9pZQtPJJKVbKSRuCQdvAmpq6IcVeyfqMx582lifDsbUq6zA8EKSwlDKkNPBK/NSZDscp4gqSrZQ24ki8vpvsoZtF0v7iPakvJjNn9VA3P4q/CplpSlKUpSlKUpSlKUpSoa6kbKHrRa7+hHtRnlRnD+qsbj8U/jVGnW9ir2MdRmQvi0sQId8ai3WGGQhKX0rZSh14pR5KVIakFXIBSlbqO/IEyr6NTG4MrKs3y5x18TLZb4dtaQFDtKakuLccKhtuVAxG9iCBsVbg7ja6nR+3C26d2dvjsp9pUhXzK1FX9hFZlSlaRam57qdgfVRmuoVgu1yuGM4REtDt8sIfWppduktBLzzbe/ELbIC9wN/M+W9Sv1bZqt/p8gZhg+RPtMXK72d2NNgyFNlxh19HkpJB2KTsR9xr567ZjneX6s4v036cZK/jbl3gOXrIL1GAMmNAQSkNsk/orWQRy8/FPzrm6dHNpt9tcnafarag2bKWUFyNdHr+9IS48BuO80r2VJJ8wAPA1lHS5q1fdWdOHZGYMtNZPjlykWK9BpPFK5LBA7gHu5Ag7eW++3hWOdcN8vWP6QWydYbvNt0heU2tlT0R9TSy2pxXJJUkg7H3jyNYB1yXnUS3ZvpyjTy/3KDNjxLrdjGiyFoRLMNDb/AAWlJAWClChsd/M/Gth2tXsbc0XTrX30i0Gx/TJ8fIdvkW/9Ll7H7a176Gb5qHdc31ITqHfrlNmSGLVdRGlSFrRE9bQ6/wBtCVEhACVpGw28h8K+/U1ddR9T9Sp2nOk2TXK1L06xx7Jbi5AkKb9Ynq2MaIspI5boSTxP2qnrTPVi0Z3oza9WFLCI71pM6alPmy40g99H7UqQsfdUE6Taf5L1W2JzWPVzOMlh2W8yXvoDHLNcVwY0WIhZQlbhb2U4slJ8Sfdv79hIGGaD57pRqNbp+n2ptzn4LJbcReLFkU1yYtpW3sLiuEEpO/mCQPD37+Ee6nWD84fWOMCv2eZNY7E3haLgGrVenIIMgPlIJ2Ox3Cjv4bnYfCs6tPTBp3DukOZF1g1EkvR323m2XMwccQ4pKgQlSfrA7bEe8VPtKVhmsFuFy07vDfHdTDSZCfkUKB/sBqlf0leNwYuVYRlzbr5mXO3zLa6gqHaS1GcQ42UjbcKJlubkkjYJ2A2O8j+jggQW9HciubcJhMyRkrrDsgNgOuNNxY6m0KV5lKS64QCdgVqI/SO9wGLRxExm0xkjYNQmE/uQK9SlK10wCHEuPV7rRb58dt+NJsFkZeacTulxCmlBSSPeCCRWvWuoumiGN3TpuvCn3sem363X3CJa91BMX1xJkQir4tqVuPlv8RU16xXJrRjqnw/W7JELaxC+2NzF7lcOBU3b3+ZW0twj9FKvZG/yV8KmzKdbtKMQxd/L7vn1j+jmWS8hTM5t1T/huEtpSSVqPkAPjUadFeL363aeX3OcjtztvlZ9kUzImojqeK2o7pHa5D3EgFX7CK6PXx/Mtav622j/AJiq7OsrTb/VRoay8hK23I9+QtKhuFJMUAg/dULIgXpu+udDHbkeorzQXNLvjt+TG3rhRv8ADmOH7TtUqafZBZ8G6gOojJbotEe22SBZpTu3gEtNQ1HYfcNgP2Vh/T7hHU7drJdtZMYyfCrS5qZNXe32bzbX5ElLW6kso5JUAEBGxSn4GvQ0AseTYRkGp3Slnk+AZV6gP3+zvwkKbiqamIUh9LKVeIShZHs+7ZVe/wBIGpePWLTdGhGd3aNjuY4S5ItkqDNeTHcda7ilIeaKtgtJCvMb+W/kRUf55arVgep+nNh0z6hM4yy+3LKYguVoXkSpyEW8K5OrcQ0NkpGwB5Hy38K9jVPENMM163RaNWGLc7ZkYK28hM6YYzffEghJ5BSfHYq8N6krG9GejvFb/b8kx2PiUW6W2QiREfRfipTbqT7JALxBO/xFT4CCNwdwa5pXl5THEvGbtGUNw7CfT+9Bqn/0j8CC5o7jtzchMKmR8laYakFsF1tpyLIU4hKvMJUWmyQDsShJP6I2+/o4v5kL3/WuT/0kSrgrRt9FQtvL1dv/AIRXbpSvIhYjjNuyO45dBskVi83ZppmdNQjZ2QhsbNpUfeEjyrp5lpzguobcJrN8Vt16TbX/AFmIJbIX2HftJPuPgP3V692s1pv1tfs98tkW4QZKOD0aS0l1pxPwUlQINR5Z+mLp9sF2RfLTpHjbE1pfcbcMQLCFfFKVbpB/YKk4AJASkAAeAArxsrw3Fs5trdny+xRLtCakNykMSUc0JeQd0LA+IJ8K/VxxHGbtfrXlFyskWTdrIHRbpjiN3IwcTxc4H3ch4Gn5H4ucqGcfQML6fEP6P+ke0O/6vy5dvl58d/HavNuelend5Vf13TELdJVlSGW70Vtb+vpa/kw79oJ28KyK3wIVqgx7ZbYrcaJEaQwwy2nihttIASlI9wAAFeZMwvFLhlMDNplhiO362MLjRLgpH8My0vfkgK+ydz4fOvGzvRnSrU1xt/PcBs16faHFD8mMC6lPwDg2Vt8t6+2DaR6ZaaJcGBYNZ7Gp0bOORIqUuLHwK/0iPkTXUzTQ7SLUW7Jv2c6e2a93BDKY6ZMyOFrDaSSE7/AEn99eE30qdOTTiXW9G8ZStBCkkQxuCPI1KqUpQkJSNgBsB8BXNK6l32+ipu/l6u5/wmqffSO/zIWT+tcb/pJddf0cE+C5o7kVsbmMKmR8ldfejhwF1tpyLHS2tSfMJUWnACfAlCgP0TtcDi0gS8ZtMlJ3DsJhX70CvUpSsOzLV7TjT6/WTGcxyqLbLnkTvZtsd0KJfVySnzAISOSgN1EDxruZHqLhuJZFYcVyK8ohXLJ3lx7U0tte0l1ABUgLA4hXiPAkb7+FZLWNYZqPhmoKbs5iF7RcW7JOcts5xDa0obkI/TQFKACtveU7j511NPdXNOdVRczp/lMW8fQ74jTeylY7Th32HtAbg8TsRuDsfGu7keoWH4lfrBjGQXhES55Q+uLamC2tRkuoAKkgpBA2BHmRRrUPD388f0zavCFZLGgJubsHtr5JjFQSHOW3HzIG2+9ZHWIaiat6daUM26RqDlEazN3WR6rDLyVq7rgAJA4g7AbjcnwG48ayzut9rvBYKOPLkPEEee9QoetHpqS4ts6ls7trKFH1CUQCDsfHt7VJuF6g4VqLYxkmD5LBvVtKigvxHOQSoeJSoeaVfIgGuME1BxDUyxflNhN4Rc7b6w7F76W1oHdbOy07LAPgflX41B1Gw3SzHF5Znd6Ra7U282wqQptbgC1nZI2QCfE/Ko0/w1umj/3JR/8AWy//AMqlHB86xbUjG42W4ZdBcLVLUtLMgNLb5FCilXsrAUNiCPKvfpXl5TIETGbtJUdg1CfV+5Bqn/0j8+C3o7jtscmMJmSMlafajlwB1xpuLIS4tKfMpSXWwSPAFaQf0hvHHo1MkgxcqzfEXGnzMudvh3JpYSO0lqM4ttwKO+4UTLb2ABGwVuRsN7qNH7iLlp3Z3OW6mGlR1fIoUR/YBWZ0p5VpPdsHT1VXfWTUNEhJbtTIxnCXSoDi/DUH3H2z7ubyUjce5RrJM3mzuozpCs2p9hBTmWH9q9tcB/CNXGCdpLfxHIJWdvmmpBzrqFt8XpaVrXZHAZV4tDaLa0nxV9IPjtpbA95S4VeH6hrA7/FmdMvR3b8MtRJzLJ0N2xrY/wAI7dp5/hV/ElAUrx/UTXSxzD7d0ra16cMWx9tOPZvY2sTu60qHA3dgc2X1fNwlSd/mayjqV/ygenr+sE7/AJTdcWf/AC/7/wD/AB/H/wCoTWytajZNiVt6p9cdQbfdHm1Y3glhexa2rUocPpiSnk68n5t8Qnf5CpO6VtQJ2c6KxoF/WfyhxNb2OXhCjuoSI3sBR/0kcDv8d6gHpN1rteDaQOWGXo/nWSLbvFxdMy0WD1uMsKdJ4BzkNyPIjbwqQujn6Ku191YzaCmLZHMiu6Hjig3bk2hCELAU+0QngtwqJ9kbeHnXr9Af8wR/rDdP+dX49IG4GenxbqkKWEX62KKUjcnZ3fYD3mu6z1SYUlltJ0L1POyQNxhy/h+2ptw6+w8mxi3ZBAtE61sXBkPohzovq8hkE/ouN/VV8q9mlYZrBcRbdO7w5y2U+0mOn5lagP7CapX9JXkkGVlWEYi20+Jlst8y5OrKR2lNSXENthJ33KgYjm4IA2KdidztFXRDlT2MdRmPMG7MQId8alWqYXihKX0rZUtpkKX5KVIajhPEhSlbJG/Ig3l9N16D1oulgWv2ozyZLY/VWNj+KfxqZaVHnUBesxsekeRP6fWGfd8ilRTCt0eE0XHEuu+x3Nh5BAJVv8qjPAOhzRG0YVZYGVYq9OvbcJo3KSLnKb7skpBcVxQ4Ej2iR4DyFfTQbTm9aKauZ3phbsbn/m7vTbV8skpSVOxo7ykht+KpaifaOwIBO5CfnUZ4hoTqMzrHbtHLtj0waVYdk8vMbfPWk+ryUrQlUeID5HturWSP9KpE1R0suWvvUVasfzfGLj+bjC7S5LLqy4yzcbk/sAlDiSCeCdiSD4FJHvroawdFOmP5u7xO0rxiTAy+3MifZn0XGS6r1llQWlIS44U7q4lI8PMimZW7UTUbLunHOJmDXiLIt01+TkLTkVSTbnCyhKi6PqArSrbfzG1dbN5mcac9Xdz1OhaSZdlVkmYlHtSHbLDDoD3d5kEqIHgE+Pjv4is1V1D5vd7Jfha+nnUW23KHaZEmAZ9uQG35IADbQ4qJKipQPl5JNYlo70V6aL07tFx1XxiVPzG6NquF5eXcZLSvWXlFxSCltwJ3TyCT4eYNdzTnSm5aC9Qd2sOCYvcfzd5tZEyC42XH2bdc2OQ2WtRJHcSTsSfEqA91YV025/qDohpurBL/ANOupVwlt3WbLD8K2ILSkOulSdipYPl8qz7RrD9Rsn1xy/X/ADDC38Mg3eys2S3WeS6hct9KCFF98I8En2dgD4+Py3Mf9N2f6iaH6dOYLfunPUm4ykXadMD8K3ILSkOuck7clA+XyrJupGdm+uHTi89YdJcut91ZyKEoWabDAmraaWFKdShJPsbHz39xrK2upzK22kIPS/qvulIH/prXw/1lSppzmk7PccF+uGFX3Fne+tn1C8spakbJ22XxSSOJ38PH3GsppUNdSN6DNotdgQv2pLypLg/VQNh+KvwqjTreyp7J+ozIWBdmJ8OxtRbVDLJQpLCUMpW6yVI81JkOyArkSpKt0nbiAIVsV7umM3y3ZJZJXq1xtUtmdDe4JX2n2lhaFcVApVspIOxBB28QavQ6ZtVrFfpWN53YZfOy5NFQN1LQVNhzb2HOClJDjbg4LSCeKkqG/hW5VKUpSlKUpSlKUpSlKVpr1M6rWKwyslzu/S+FlxmKsbpWgKcDYPsN81JSXHHDwQkkclKSN/GqL79e7pk18uOSXuV6zcbrLenTHuCUd191ZWtXFICU7qUTsAAN/ACujW//AKOzV5V3xm5aOXN8+t4+V3S0kJ23hOODvI9lAA7b7gVyUsqV6zsAEt1b5pflyMwxGJPW4DLYHq8oe8OJHn942P31ltKUpSlKUpSlKUpSlYlqhlyMOxGXPbcAlvj1eKPf3FDz+4bn7qqD9Inq8bTjNt0ctj59byAoul2JTvtCbcPZR7SCD3H2yrklYUn1bYgpcrQClZVpXqFdNKtQ7FqDaG+6/ZpYeWzulPfYUCh5nkpKgnm0paOXElPLceIFXg9O2smPOLt2UWC9sXHF8jaTtJZJ4bbkBZB2KVIVulSVAKSQpKgCCBt4lSVpC0KBSobgg+BFc0pSlKUpSlKUpSlcKUlCStagEpG5JPgBWofUTrJjza7jlF/vbFuxfHGlbyXieG24BWANypS1bJSlIKlEpSkEkA0faqahXTVXUO+6g3dvtP3mWXkM7pV2GEgIZZ5JSkK4NJQjlxBVx3PiTWK0pW3HQv1H/kZfG9HMzmznrPfpbTNhXv3G7fNcWQWuIHINvLWnxB4oWNykBxxabjdDdS03GM3hl8kfxthO0J1Z/lWx/Rk/aHu+I/ZUx0pSlKUpSlKUpSlQ3rlqWm3xnMMskj+Nvp2muoP8k2f6MH7R9/wH7apz66Oo/wDLO+OaO4bNnM2ewy3Wb8vftt3Ca2sANcSAstsrQrxJ4rWdwkhttatR6UpSrF+h7qlumfMfm4z2/NnKbOhDlmnuvKEq6MICioKJGy3mglJKuXNaCVFJLbjirR9J9V42YRkWa8uoZvLKdvHwElI+sn9b4j7x8pKpSlKUpSlKUpSo11Y1YjYfGXZrM6h68vJ28PFMZJ+sr9b4D7zVXHXD1S3TAWPzc4Ff2hlN4Qty8z2nlGVa2FBJSEkDZDzoUohXLmhA5BILjbia6KUpSlfeBPnWudHudsmvw5kN1D8eQw4W3WXUEKStCk7FKgQCCDuCN6sJ6Uut5/PL1EwTVGREtmSOKaRZ7vGHYanuhKR23Bvs3IUoFSSnihZVwSlCghLlmummuUa4pasmZvIYl+CGpp8G3fgF/ZV8/I/KpiSpK0haFBSSNwQdwRXNKUpSlKUpXClJQkrWoJSBuSTsAKh3UvXKNbku2TDHkPyvFDs0eLbXxCPtK+fkPnVZXVd1vP4HepeCaXSIlzyVtTqLxd5I77UB0pUO22N9nJCVEKUVckIKeCkrUVpbr2nz510nSLnc5j8yZMdW/IkPuFx151ZKlLWpW5Uokkkk7knevhSlKUpSto+nPrfyHSyDBwjUOG/f8UgtONRnmAFXKGnYdppBWtKHGUkFIQrZSQvwXxbS3VoGifUvEuFjj3fDMmg5Vji+KeDb/MsKKEr7Z+sy4ErSS2sAp5DdINbMYjqhiOYoS3AuCWJZHjFkEIc3+XuV91ZbSlKUpSlYll2qGI4chTc+4JflgeEWOQtzf5+5P31rPrZ1LxLfY5F3zPJoOK44jkng4/wL6ghS+2PrPOFKFENoBKuJ2STVX/UZ1v5DqnBnYRp5DfsGKTmm2pLz4CblMTse60soWpDbKiQkoTupQR4r4uKbrVylKUpSlKUr3MNznMNPL41kmEZHOs1xa4jvRXSjuIC0r7bif0XGypCSW1gpVsNwa3A0o9I4/BhJt2seKyJr0doBu7WJKEuvKSEAd2O4pKApRDi1OIWlO5SlLQHjW8uknWljWQiBFwjVmx35U7uCNa5kkCYsN8uYEdwpkJ2CFK8Uj2RyHs7GtgrL1I2l4JRf7DIjK97kZYcT+47EfjWZW7WDTu5AdvJGWFH6shKmiP3jb8a9+PlOMywFRchtroP2ZSD/AH12fpe1bb/ScTb/AFyf+9daRlOMxAVSshtrQH2pSB/fXgXHWDTu2g9zJGX1D6sdKnSf3Db8aw29dSNpZCkWCwyJKvc5JWG0/uG5P4Vr7q11o41jwnxc31ZsdiMHtiTaockGYgOceAMdsqkK3C0q8En2TyPs7mtGtV/SOPzoSrdo5isiG9IaIcut9ShTrKlBYPajtrUgqSS2tLi1qTuFJU0R41p/mWc5fqHfHckzbI515uLvId6U6V9tBWpfbbT+i22FLUQ2gBKeR2Arw6UpSlKUpSlKUqRsN6jdcsB7SMY1PvjTEeImCxFlP+uxmWE8eKW2JAW2jiEJAKUggbgEAkGVbJ6QzXu1WtmBPh4peX2uXOdOtzqH3d1EjkGHW2xsCEjigeCRvudyc5snpLr3HtbLWSaRwJ1xTy70iDd1xGF+0ePFpbTqk7J4g7uK3IJ8N9h3v8Zp/mT/AN5P/Fro3v0l17kWt5rG9I4EG4q49mROu65bCPaHLk0hppSt08gNnE7Eg+O2xwa9+kM17utregQIeKWZ93jwnQbc6t9rZQJ4h91xs7gFJ5IPgo7bHYiKsy6jdcs+7qMn1PvjrEiIqC/Fiv8AqUZ5hXLklxiOENr5BagSpJJGwJIAAjmlKUpSlK//2Q==";

interface ProductSingleProps {
  isCreate: boolean;
  url: string;
  selectedId: string | undefined;
  setDisplay: React.Dispatch<SetStateAction<Display>>;
}

function ProductSingle({
  url,
  selectedId,
  isCreate,
  setDisplay,
}: ProductSingleProps) {
  const [product, setProduct] = useState<Product>({
    _id: undefined,
    name: "Name",
    quantity: 0,
    price: 0,
    image: defaultImg,
  });

  useEffect(() => {
    if (isCreate) return;
    fetch(url + "/" + selectedId)
      .then((response) => {
        if (!response.ok) {
          console.error(response);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data["data"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const btnBackClicked = () => {
    setDisplay("list");
  };

  const btnDeleteClicked = () => {};

  const btnUpdateClicked = () => {
    fetch(url + "/" + selectedId, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error(response);
          return;
        }
        setDisplay("list");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const btnAddClicked = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error(response);
          return;
        }
        setDisplay("list");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const parseNumberInput = (input: string, prev: number): number => {
    const num = Number.parseFloat(input);
    return Number.isNaN(num) ? prev : num;
  };

  return (
    <div className="ProductSingle">
      <img src={product.image} />
      <label className="ImageUpload">
        Upload
        <input
          className="ImageUpload"
          type="file"
          accept="image/jpeg"
          onChange={(ev) => {
            if (!ev.target.files) {
              return;
            }
            const fr = new FileReader();
            fr.onload = (ev) => {
              if (!ev.target) {
                return;
              }
              let tmp = { ...product };
              tmp.image = ev.target.result as string;
              setProduct(tmp);
            };
            fr.readAsDataURL(ev.target.files[0]);
          }}
        />
      </label>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={(ev) => {
          let tmp = { ...product };
          tmp.name = ev.target.value;
          setProduct(tmp);
        }}
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={(ev) => {
          let tmp = { ...product };
          tmp.price = parseNumberInput(ev.target.value, tmp.price);
          setProduct(tmp);
        }}
      />

      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        name="quantity"
        value={product.quantity}
        onChange={(ev) => {
          let tmp = { ...product };
          tmp.quantity = parseNumberInput(ev.target.value, tmp.quantity);
          setProduct(tmp);
        }}
      />

      {isCreate ? <button onClick={btnAddClicked}>Add</button> : null}
      {!isCreate ? <button onClick={btnUpdateClicked}>Update</button> : null}
      {!isCreate ? <button onClick={btnDeleteClicked}>Delete</button> : null}
      <button onClick={btnBackClicked}>Back</button>
    </div>
  );
}

export default ProductSingle;
